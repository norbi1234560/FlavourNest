using System.Windows;

namespace FlavourNest
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Dashboard_Click(object sender, RoutedEventArgs e)
        {
            MainTabs.SelectedIndex = 0;
        }

        private void RecipeManagement_Click(object sender, RoutedEventArgs e)
        {
            MainTabs.SelectedIndex = 1;
        }

        private void Users_Click(object sender, RoutedEventArgs e)
        {
            MainTabs.SelectedIndex = 2;
        }

        private void Categories_Click(object sender, RoutedEventArgs e)
        {
            MainTabs.SelectedIndex = 3;
        }

        private void Analytics_Click(object sender, RoutedEventArgs e)
        {
            MainTabs.SelectedIndex = 4;
        }

        private void Settings_Click(object sender, RoutedEventArgs e)
        {
            MainTabs.SelectedIndex = 5;
        }
    }
}
