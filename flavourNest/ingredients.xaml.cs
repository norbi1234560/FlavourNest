using System;
using System.Windows;
using MySql.Data.MySqlClient;

namespace flavourNest
{
    public partial class ingredients : Window
    {
        string connectionString = "server=localhost;database=flavournest;uid=root;pwd=;";
        int selectedId = -1;

        public ingredients()
        {
            InitializeComponent();
            LoadIngredients();
        }

        private void LoadIngredients()
        {
            ingredientsListBox.Items.Clear();

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query = "SELECT id, name FROM ingredients ORDER BY name";

                MySqlCommand cmd = new MySqlCommand(query, connection);

                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        ingredientsListBox.Items.Add(
                            new IngredientItem
                            {
                                Id = reader.GetInt32("id"),
                                Name = reader.GetString("name")
                            });
                    }
                }
            }
        }

        private void ingredientsListBox_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (ingredientsListBox.SelectedItem is IngredientItem item)
            {
                selectedId = item.Id;
                ingredientTextBox.Text = item.Name;
            }
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            string name = ingredientTextBox.Text.Trim();

            if (string.IsNullOrEmpty(name))
            {
                MessageBox.Show("Adj meg egy alapanyag nevet!");
                return;
            }

            try
            {
                using (MySqlConnection connection = new MySqlConnection(connectionString))
                {
                    connection.Open();

                    MySqlCommand cmd;

                    if (selectedId == -1)
                    {
                        // új alapanyag
                        cmd = new MySqlCommand("INSERT INTO ingredients (name) VALUES (@name)", connection);
                    }
                    else
                    {
                        // módosítás
                        cmd = new MySqlCommand("UPDATE ingredients SET name=@name WHERE id=@id", connection);
                        cmd.Parameters.AddWithValue("@id", selectedId);
                    }

                    cmd.Parameters.AddWithValue("@name", name);
                    cmd.ExecuteNonQuery();
                }

                ingredientTextBox.Clear();
                selectedId = -1;
                ingredientsListBox.SelectedItem = null;

                LoadIngredients();
            }
            catch (MySqlException ex) when (ex.Number == 1062)
            {
                MessageBox.Show("Ez az alapanyag már létezik!");
            }
            catch (Exception ex)
            {
                MessageBox.Show("Hiba: " + ex.Message);
            }
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (selectedId == -1)
            {
                MessageBox.Show("Válassz ki egy alapanyagot!");
                return;
            }

            var result = MessageBox.Show(
                "Biztosan törölni szeretnéd ezt az alapanyagot?",
                "Törlés megerősítése",
                MessageBoxButton.YesNo);

            if (result != MessageBoxResult.Yes)
                return;

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query = "DELETE FROM ingredients WHERE id=@id";

                MySqlCommand cmd = new MySqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@id", selectedId);
                cmd.ExecuteNonQuery();
            }

            ingredientTextBox.Clear();
            selectedId = -1;
            ingredientsListBox.SelectedItem = null;

            LoadIngredients();
        }

        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }

    public class IngredientItem
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}