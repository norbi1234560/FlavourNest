using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media.Imaging;
using MySql.Data.MySqlClient;

namespace flavourNest
{
    public partial class users : Window
    {
        string connectionString = "server=localhost;database=flavournest;uid=root;pwd=;";
        int selectedUserId = -1;

        public users()
        {
            InitializeComponent();
            LoadUsers();
        }

        void LoadUsers()
        {
            adatbazis.Items.Clear();

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                string query = @"
                    SELECT id, username, email, password,
                           NULLIF(created_at,'0000-00-00') AS created_at,
                           avatar
                    FROM users";

                connection.Open();
                using (MySqlCommand cmd = new MySqlCommand(query, connection))
                using (MySqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        byte[] imgBytes = reader["avatar"] as byte[];
                        BitmapImage bitmap = null;

                        if (imgBytes != null && imgBytes.Length > 0)
                        {
                            try
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
                            catch {}
                        }

                        adatbazis.Items.Add(new
                        {
                            id = Convert.ToInt32(reader["id"]),
                            username = reader["username"].ToString(),
                            email = reader["email"].ToString(),
                            password = reader["password"].ToString(),
                            created_at = reader["created_at"]?.ToString(),
                            ImageSource = bitmap
                        });
                    }
                }
            }
        }

        private void adatbazis_MouseDoubleClick(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            if (adatbazis.SelectedItem == null) return;

            dynamic selected = adatbazis.SelectedItem;

            selectedUserId = selected.id;

            usernameBox.Text = selected.username;
            emailBox.Text = selected.email;
            passwordBox.Text = selected.password;
        }

        private void SaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (selectedUserId == -1)
            {
                MessageBox.Show("Válasszon ki egy felhasználót!");
                return;
            }

            string username = usernameBox.Text.Trim();
            string email = emailBox.Text.Trim();
            string password = passwordBox.Text.Trim();

            if (username == "" || email == "" || password == "")
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!");
                return;
            }

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query = @"UPDATE users 
                                 SET username=@username, email=@email, password=@password 
                                 WHERE id=@id";

                MySqlCommand cmd = new MySqlCommand(query, connection);

                cmd.Parameters.AddWithValue("@username", username);
                cmd.Parameters.AddWithValue("@email", email);
                cmd.Parameters.AddWithValue("@password", password);
                cmd.Parameters.AddWithValue("@id", selectedUserId);

                cmd.ExecuteNonQuery();
            }

            MessageBox.Show("Felhasználó frissítve!");

            usernameBox.Clear();
            emailBox.Clear();
            passwordBox.Clear();

            selectedUserId = -1;

            LoadUsers();
        }

        private void deleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (adatbazis.SelectedItem == null)
            {
                MessageBox.Show("Válasszon ki egy felhasználót!");
                return;
            }

            dynamic selected = adatbazis.SelectedItem;
            int id = selected.id;

            var result = MessageBox.Show(
                "Biztosan törölni szeretné ezt a felhasználót?",
                "Törlés megerősítése",
                MessageBoxButton.YesNo);

            if (result != MessageBoxResult.Yes) return;

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string query = "DELETE FROM users WHERE id=@id";

                MySqlCommand cmd = new MySqlCommand(query, connection);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
            }

            LoadUsers();
        }

        private void buttonBezaras_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}