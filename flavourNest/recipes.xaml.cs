using MySql.Data.MySqlClient;
using System;
using System.IO;
using System.Windows;
using System.Windows.Media.Imaging;

namespace flavourNest
{
    public partial class recipes : Window
    {

        string connectionString = "server=127.0.0.1;database=flavournest;uid=root;pwd=;";

        public recipes()
        {
            InitializeComponent();
            LoadRecipes();
        }


        private void LoadRecipes()
        {
            recipesGrid.Items.Clear();

            string query = @"SELECT r.id,
                                    r.title,
                                    u.username AS author_name,
                                    r.servings,
                                    r.prep_time_minutes,
                                    r.created_at,
                                    r.image
                             FROM recipes r
                             LEFT JOIN users u ON r.author_id = u.id";


            using (var conn = new MySqlConnection(connectionString))
            {
                conn.Open();

                using (var cmd = new MySqlCommand(query, conn))
                using (var reader = cmd.ExecuteReader())
                {

                    while (reader.Read())
                    {
                        byte[] imgBytes = reader["image"] as byte[];

                        BitmapImage bitmap = null;

                        if (imgBytes != null && imgBytes.Length > 0)
                        {
                            bitmap = new BitmapImage();

                            using (var ms = new MemoryStream(imgBytes))
                            {
                                bitmap.BeginInit();
                                bitmap.CacheOption = BitmapCacheOption.OnLoad;
                                bitmap.StreamSource = ms;
                                bitmap.EndInit();
                            }
                        }


                        recipesGrid.Items.Add(new
                        {
                            id = Convert.ToInt32(reader["id"]),
                            title = reader["title"].ToString(),
                            author_name = reader["author_name"].ToString(),
                            servings = reader["servings"],
                            prep_time_minutes = reader["prep_time_minutes"],
                            created_at = reader["created_at"],
                            ImageSource = bitmap
                        });
                    }

                }
            }
        }


        private void recipesGrid_MouseDoubleClick(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            if (recipesGrid.SelectedItem == null) return;

            dynamic selected = recipesGrid.SelectedItem;


            RecipeDetails modal = new RecipeDetails(
                selected.id,
                selected.title,
                selected.author_name,
                Convert.ToInt32(selected.prep_time_minutes)
            );


            modal.Owner = this;
            modal.ShowDialog();
        }


        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (recipesGrid.SelectedItem == null)
            {
                MessageBox.Show("Kérlek válassz egy receptet a törléshez.");
                return;
            }

            dynamic selected = recipesGrid.SelectedItem;

            int recipeId = selected.id;


            var result = MessageBox.Show(
                $"Biztosan törlöd a receptet: {selected.title} ?",
                "Megerősítés",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question
            );

            if (result != MessageBoxResult.Yes) return;


            string deleteQuery = "DELETE FROM recipes WHERE id=@id";


            using (var conn = new MySqlConnection(connectionString))
            {
                conn.Open();

                using (var cmd = new MySqlCommand(deleteQuery, conn))
                {
                    cmd.Parameters.AddWithValue("@id", recipeId);
                    cmd.ExecuteNonQuery();
                }
            }


            LoadRecipes();
        }


        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

    }
}