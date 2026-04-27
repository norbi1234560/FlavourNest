using System;
using System.Data;
using System.Windows;
using System.Windows.Controls;
using MySql.Data.MySqlClient;

namespace flavourNest
{
    public partial class comments : Window
    {
        string connectionString = "server=localhost;database=flavournest;uid=root;pwd=;";
        int selectedCommentId = -1;

        public comments()
        {
            InitializeComponent();
            LoadComments();
        }

        private void LoadComments()
        {
            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query = @"
                    SELECT c.id, r.title AS recipe_title, u.username, c.content, c.created_at
                    FROM comments c
                    LEFT JOIN users u ON c.user_id = u.id
                    LEFT JOIN recipes r ON c.recipe_id = r.id
                    ORDER BY c.created_at DESC";

                MySqlDataAdapter adapter = new MySqlDataAdapter(query, connection);
                DataTable dt = new DataTable();
                adapter.Fill(dt);

                commentsGrid.ItemsSource = dt.DefaultView;
            }
        }

        private void commentsGrid_MouseDoubleClick(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            if (commentsGrid.SelectedItem == null) return;

            DataRowView row = (DataRowView)commentsGrid.SelectedItem;

            selectedCommentId = Convert.ToInt32(row["id"]);
            commentEditBox.Text = row["content"].ToString();
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (selectedCommentId == -1)
            {
                MessageBox.Show("Válasszon ki egy kommentet!");
                return;
            }

            string newContent = commentEditBox.Text.Trim();

            if (newContent == "")
            {
                MessageBox.Show("A komment nem lehet üres!");
                return;
            }

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query = "UPDATE comments SET content=@content WHERE id=@id";

                MySqlCommand cmd = new MySqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@content", newContent);
                cmd.Parameters.AddWithValue("@id", selectedCommentId);

                cmd.ExecuteNonQuery();
            }

            commentEditBox.Clear();
            selectedCommentId = -1;

            LoadComments();
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            commentEditBox.Clear();
            selectedCommentId = -1;
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (commentsGrid.SelectedItem == null)
            {
                MessageBox.Show("Jelöljön ki egy kommentet!");
                return;
            }

            DataRowView row = (DataRowView)commentsGrid.SelectedItem;
            int commentId = Convert.ToInt32(row["id"]);

            if (MessageBox.Show("Biztosan törli ezt a kommentet?",
                "Törlés",
                MessageBoxButton.YesNo) != MessageBoxResult.Yes)
                return;

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query = "DELETE FROM comments WHERE id=@id";

                MySqlCommand cmd = new MySqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@id", commentId);
                cmd.ExecuteNonQuery();
            }

            LoadComments();
        }
    }
}