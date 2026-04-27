using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace flavourNest
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Users_Click(object sender, RoutedEventArgs e)
        {
            users window = new users();
            window.Show();
        }

        private void Comments_Click(object sender, RoutedEventArgs e)
        {
            comments window = new comments();
            window.Show();
        }

        private void Ingredients_Click(object sender, RoutedEventArgs e)
        {
            ingredients window = new ingredients();
            window.Show();
        }

        private void Recipes_Click(object sender, RoutedEventArgs e)
        {
            recipes window = new recipes();
            window.Show();
        }

        private void Quit_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }
    }
}