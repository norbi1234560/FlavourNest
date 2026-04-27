using MySql.Data.MySqlClient;
using System.Data;
using System.Windows;

namespace flavourNest
{
    public partial class RecipeDetails : Window
    {
        string connection = "server=127.0.0.1;database=flavournest;uid=root;pwd=;";

        int recipeId;

        public RecipeDetails(int id, string title, string author, int time)
        {
            InitializeComponent();

            recipeId = id;

            titleText.Text = title;
            authorText.Text = "Szerző: " + author;
            timeText.Text = "Elkészítés: " + time + " perc";

            LoadData();
        }

        void LoadData()
        {
            using (var conn = new MySqlConnection(connection))
            {
                conn.Open();

                LoadIngredients(conn);
                LoadSteps(conn);
                LoadTags(conn);
                LoadRatings(conn);
                LoadComments(conn);
            }
        }

        void LoadIngredients(MySqlConnection conn)
        {
            string q = @"SELECT i.name, ri.quantity, ri.unit
                        FROM recipe_ingredients ri
                        JOIN ingredients i ON i.id = ri.ingredient_id
                        WHERE ri.recipe_id=@id";

            MySqlDataAdapter da = new MySqlDataAdapter(q, conn);
            da.SelectCommand.Parameters.AddWithValue("@id", recipeId);

            DataTable dt = new DataTable();
            da.Fill(dt);

            ingredientsGrid.ItemsSource = dt.DefaultView;
        }

        void LoadSteps(MySqlConnection conn)
        {
            string q = @"SELECT position, instruction
                        FROM recipe_steps
                        WHERE recipe_id=@id
                        ORDER BY position";

            MySqlDataAdapter da = new MySqlDataAdapter(q, conn);
            da.SelectCommand.Parameters.AddWithValue("@id", recipeId);

            DataTable dt = new DataTable();
            da.Fill(dt);

            stepsGrid.ItemsSource = dt.DefaultView;
        }

        void LoadTags(MySqlConnection conn)
        {
            string q = @"SELECT t.name
                        FROM recipe_tags rt
                        JOIN tags t ON t.id = rt.tag_id
                        WHERE rt.recipe_id=@id";

            MySqlDataAdapter da = new MySqlDataAdapter(q, conn);
            da.SelectCommand.Parameters.AddWithValue("@id", recipeId);

            DataTable dt = new DataTable();
            da.Fill(dt);

            tagsGrid.ItemsSource = dt.DefaultView;
        }

        void LoadRatings(MySqlConnection conn)
        {
            string q = @"SELECT score
                        FROM ratings
                        WHERE recipe_id=@id";

            MySqlDataAdapter da = new MySqlDataAdapter(q, conn);
            da.SelectCommand.Parameters.AddWithValue("@id", recipeId);

            DataTable dt = new DataTable();
            da.Fill(dt);

            ratingsGrid.ItemsSource = dt.DefaultView;
        }

        void LoadComments(MySqlConnection conn)
        {
            string q = @"SELECT u.username, c.content, c.created_at
                        FROM comments c
                        JOIN users u ON u.id = c.user_id
                        WHERE c.recipe_id=@id";

            MySqlDataAdapter da = new MySqlDataAdapter(q, conn);
            da.SelectCommand.Parameters.AddWithValue("@id", recipeId);

            DataTable dt = new DataTable();
            da.Fill(dt);

            commentsGrid.ItemsSource = dt.DefaultView;
        }

        private void Close_Click(object sender, RoutedEventArgs e)
        {
            Close();
        }
    }
}