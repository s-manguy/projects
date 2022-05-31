-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 31, 2022 at 06:53 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `masuperagence_test_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `option`
--

CREATE TABLE `option` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `option`
--

INSERT INTO `option` (`id`, `name`) VALUES
(1, 'Garage'),
(2, 'Jardin'),
(3, 'Piscine'),
(4, 'Salle de sport'),
(5, 'Salle de musique'),
(6, 'Balcon'),
(7, 'Ascenseur'),
(8, 'Adapté PMR');

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `surface` int(11) NOT NULL,
  `rooms` int(11) NOT NULL,
  `bedrooms` int(11) NOT NULL,
  `floor` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `heat` int(11) NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sold` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`id`, `title`, `description`, `surface`, `rooms`, `bedrooms`, `floor`, `price`, `heat`, `city`, `address`, `postal_code`, `sold`, `created_at`, `filename`, `updated_at`) VALUES
(1, 'nobis rem est', 'Totam architecto dolorem tempora sint deserunt. Quos dolores et aperiam numquam odit non vel. Occaecati iste ex consequuntur et expedita voluptate eos.', 249, 8, 2, 7, 707264, 1, 'Godarddan', '4, boulevard Fournier\n45224 Mercier', '59685', 0, '2022-05-17 11:54:18', NULL, NULL),
(2, 'repellat magnam deserunt', 'Cupiditate suscipit modi quibusdam consectetur in. Ducimus praesentium et omnis repudiandae aliquam. Sint laudantium molestias ut aut facere eos.', 25, 6, 6, 9, 895129, 1, 'Besnard', '519, impasse Costa\n52242 Benard-sur-Parent', '50188', 0, '2022-05-17 11:54:18', NULL, NULL),
(3, 'ut labore dolores', 'Voluptatem deserunt neque fugit fugiat neque. Quisquam neque in rem aperiam sunt. Et provident vitae velit sit aut.', 47, 10, 8, 11, 859757, 0, 'Leduc', '44, rue Étienne Bouchet\n31370 Lenoirboeuf', '76 305', 0, '2022-05-17 11:54:18', NULL, NULL),
(4, 'laboriosam ex magnam', 'Cum neque eaque eaque quia architecto ad. Pariatur nihil consectetur et ipsam voluptatem. Eaque ut ut vel.', 131, 5, 9, 15, 794605, 1, 'Vasseur', '45, avenue de Menard\n48 614 FournierVille', '33 689', 0, '2022-05-17 11:54:18', NULL, NULL),
(5, 'iste similique cum', 'Eos hic doloremque consequuntur aliquam ipsam excepturi. Aut iste laudantium voluptas reprehenderit. Quasi qui est modi.', 206, 7, 3, 8, 547845, 0, 'Masson', '8, rue Édouard Albert\n60136 ValetteVille', '13 815', 0, '2022-05-17 11:54:18', NULL, NULL),
(6, 'omnis inventore porro', 'Sit dolor corporis qui sed qui non odit. Optio eligendi consequatur quasi. Veritatis labore fugit voluptas sapiente nostrum qui modi.', 196, 2, 6, 0, 982084, 0, 'Valette-sur-Barthelemy', '4, avenue Riviere\n42372 Gomes', '57722', 0, '2022-05-17 11:54:18', NULL, NULL),
(7, 'quidem iste commodi', 'Dolorem non aut occaecati cumque consequatur nam atque. Aut aliquam molestiae sint. Qui assumenda consequuntur consequatur quis illo.', 99, 5, 2, 4, 309151, 0, 'LefebvreVille', '7, avenue Charlotte Raymond\n69250 Berger', '35737', 0, '2022-05-17 11:54:18', NULL, NULL),
(8, 'qui accusantium ullam', 'Eaque iusto ducimus tenetur aspernatur. Aut eos ut expedita voluptates et. Sunt esse repudiandae cum nisi necessitatibus.', 220, 5, 2, 14, 694442, 0, 'Reynaud-sur-Leger', '243, impasse Robert Nguyen\n49 854 Pichon-sur-Brunel', '82 530', 0, '2022-05-17 11:54:18', NULL, NULL),
(9, 'quo deleniti dolorum', 'Ut numquam et ratione iure excepturi consequatur. Dolore a possimus et dolor accusamus et sed voluptas. Vel cupiditate eligendi ipsum voluptas culpa sit voluptatum.', 118, 8, 4, 8, 667892, 0, 'Gaydan', '10, rue Blondel\n85695 Weiss-les-Bains', '47 825', 0, '2022-05-17 11:54:18', NULL, NULL),
(10, 'rem exercitationem qui', 'Magnam rem quo illo recusandae nihil expedita. Vel accusantium delectus minima porro omnis et possimus. Non sed atque dolorum.', 285, 10, 7, 7, 283329, 0, 'Laroche-sur-Joubert', '905, rue Gay\n67 621 Ribeiro', '41 390', 0, '2022-05-17 11:54:18', NULL, NULL),
(11, 'rerum est quis', 'Sint reprehenderit aspernatur voluptas et. Explicabo nostrum et officia voluptas recusandae. Recusandae distinctio dolorem nemo laboriosam eaque molestiae in.', 63, 3, 10, 8, 176341, 0, 'Dupre', '9, place de Traore\n09 971 Chauveau', '07 428', 0, '2022-05-17 11:54:18', NULL, NULL),
(12, 'ut repellendus dolor', 'Odit iure dolor sit eveniet. Dolor ut nemo minus rerum. Est consequuntur ut eveniet cupiditate esse eos excepturi.', 338, 2, 10, 1, 441885, 1, 'Lopesdan', '870, impasse de Bailly\n89799 Lebreton-sur-Mer', '19 225', 0, '2022-05-17 11:54:18', NULL, NULL),
(13, 'voluptas vitae explicabo', 'Facere voluptatem beatae assumenda et ea iste. Esse dicta voluptatum est id est perferendis. Accusamus aut possimus qui blanditiis delectus tempora et possimus.', 120, 10, 3, 7, 831395, 1, 'Brunel-sur-Leroy', 'avenue Ferreira\n70802 Bertin-sur-Mer', '96652', 0, '2022-05-17 11:54:18', NULL, NULL),
(14, 'sit voluptates quia', 'Ex qui dignissimos nemo ut. Cum omnis doloremque blanditiis et laborum explicabo dicta. Id veniam voluptatum saepe amet est harum et.', 210, 7, 9, 1, 932875, 0, 'Tanguy', '999, boulevard Caroline Boucher\n44 966 Allard', '17488', 0, '2022-05-17 11:54:18', NULL, NULL),
(15, 'magnam minus eius', 'Saepe aliquid ducimus dolores tenetur asperiores maiores voluptate. Fuga odit aut recusandae enim. Officiis aperiam quidem ipsam iste.', 232, 10, 4, 14, 593721, 0, 'Navarro-sur-Mer', '34, impasse Pages\n68 561 Texierboeuf', '06 721', 0, '2022-05-17 11:54:18', NULL, NULL),
(16, 'aut et ea', 'Non qui et eveniet libero sunt sed. Sint non omnis quos unde non autem assumenda. Quia id accusamus culpa possimus.', 337, 9, 7, 10, 560218, 0, 'Diazdan', 'rue Antoine Etienne\n98137 Ribeiro', '51 105', 0, '2022-05-17 11:54:18', NULL, NULL),
(17, 'illo sed sunt', 'Repellat veniam qui soluta molestiae quaerat ex. Quo nihil repellat rerum. Officiis et omnis ipsa.', 29, 5, 5, 4, 926432, 0, 'Guibert', 'boulevard Lucas\n57902 Muller', '84 769', 0, '2022-05-17 11:54:18', NULL, NULL),
(18, 'distinctio sed voluptatem', 'Nihil cupiditate omnis qui dolorum enim aut vitae nostrum. Quia eius ut voluptas veniam. Laborum nisi et quia sit.', 161, 8, 9, 9, 843980, 0, 'Fabre', '8, chemin Seguin\n79269 Nguyen', '66133', 0, '2022-05-17 11:54:18', NULL, NULL),
(19, 'consequatur corrupti reiciendis', 'Aliquid ratione officiis non quos quia. Nostrum magnam animi sed qui voluptatum ipsa rerum. Natus beatae cumque minus rem laudantium molestiae.', 119, 8, 10, 3, 686363, 0, 'Mahe', 'chemin Nicole Seguin\n65 197 Lebreton', '75 710', 0, '2022-05-17 11:54:18', NULL, NULL),
(20, 'sequi id aliquid', 'Ea qui ut vero et. Necessitatibus veritatis illo ipsum praesentium. Vel harum totam amet quas ut et et.', 339, 8, 5, 15, 784157, 1, 'Daniel-sur-Le Goff', '538, place Bernadette Millet\n98 654 Hoarau', '04 432', 0, '2022-05-17 11:54:18', NULL, NULL),
(21, 'aliquam iusto dolores', 'Sint blanditiis fuga sint est ut et facilis. Est a quo id corrupti et quidem. Eveniet officiis repudiandae et harum.', 318, 9, 4, 7, 957734, 1, 'Marechal', 'rue Simon\n36 964 Clement', '32 313', 0, '2022-05-17 11:54:18', NULL, NULL),
(22, 'consequatur ratione ut', 'Nisi cumque in velit dicta facere officiis. Nesciunt ut beatae quia. Facere et vel quia.', 327, 3, 6, 11, 583201, 0, 'Morel', '76, place de Millet\n03 969 Dupuy-sur-Gay', '37945', 0, '2022-05-17 11:54:18', NULL, NULL),
(23, 'occaecati vel error', 'Totam eum voluptatem voluptate eum doloremque fuga qui. Vitae laborum non velit qui. Nisi expedita facere quia sunt fuga ad.', 61, 3, 10, 13, 341542, 0, 'Navarroboeuf', '72, boulevard Fernandez\n55 231 Boulayboeuf', '43516', 0, '2022-05-17 11:54:18', NULL, NULL),
(24, 'quae et sed', 'Dolorem nostrum quod occaecati est dolor vel. Ut molestiae exercitationem nihil laborum asperiores et non. Beatae dolor architecto nihil eum.', 164, 10, 6, 9, 556374, 1, 'Bouvierdan', '21, avenue Diallo\n23909 RegnierVille', '91 280', 0, '2022-05-17 11:54:18', NULL, NULL),
(25, 'sit quidem facilis', 'Ducimus perspiciatis dolorum quis non nulla at non maiores. Enim velit et voluptas reiciendis quidem iure nam. Ut voluptatem magni deserunt reprehenderit suscipit.', 117, 5, 5, 10, 302289, 1, 'GarnierBourg', '98, avenue Collin\n11284 MoreauBourg', '36 516', 0, '2022-05-17 11:54:18', NULL, NULL),
(26, 'qui dolores facilis', 'Quaerat ratione quam consequatur praesentium sequi. Voluptate blanditiis eius sed est facere provident qui. Sed corrupti repellendus quia qui.', 258, 9, 10, 9, 460945, 1, 'Gregoire', '249, boulevard Marty\n15971 Pelletierboeuf', '89 714', 0, '2022-05-17 11:54:18', NULL, NULL),
(27, 'est dignissimos natus', 'Magni soluta repudiandae labore nam tempore omnis quibusdam. Tempore provident quis amet. Ab aut nihil quis recusandae.', 89, 10, 5, 15, 770890, 0, 'Normand', '77, boulevard de Bouvet\n36 103 Alves', '72 403', 0, '2022-05-17 11:54:18', NULL, NULL),
(28, 'quo placeat eligendi', 'Cum voluptatum alias explicabo occaecati aut. Rerum et numquam ut. Voluptas quia dignissimos voluptas accusantium rerum.', 333, 5, 6, 15, 904750, 0, 'Renault-sur-Duhamel', '96, rue Peron\n09 193 Gerard', '94 257', 0, '2022-05-17 11:54:18', NULL, NULL),
(29, 'fugit dolor rerum', 'Nesciunt harum nobis eveniet debitis facere. Ex in repellendus consequuntur sequi expedita. Saepe assumenda qui cumque ut illum.', 221, 9, 4, 4, 906624, 1, 'Benoitnec', '98, place Hernandez\n73 896 Fischer', '54444', 0, '2022-05-17 11:54:18', NULL, NULL),
(30, 'aliquid voluptatem dolores', 'Laborum iusto et illo qui fugit laudantium autem. In odio dolores et quisquam nisi inventore dolores. Praesentium repellendus quia et labore.', 43, 4, 10, 0, 323023, 0, 'Danielboeuf', '15, place Joséphine Millet\n40 989 Grenier-sur-Blondel', '42811', 0, '2022-05-17 11:54:18', NULL, NULL),
(31, 'dicta accusamus animi', 'Eaque ratione assumenda ipsum omnis qui maxime officia non. Quia ut distinctio voluptatem nemo est. Velit assumenda minima amet ut minima sint fugiat.', 348, 10, 5, 15, 810300, 1, 'Delaunay', 'rue Adèle Leger\n74 405 Fouchernec', '67 037', 0, '2022-05-17 11:54:18', NULL, NULL),
(32, 'quia aut accusantium', 'Et in totam non quia. Necessitatibus nulla commodi dolorum assumenda voluptatum est occaecati ratione. Qui et asperiores vel dolore.', 342, 8, 6, 8, 618262, 1, 'Rossi-sur-Becker', '58, avenue Fouquet\n74280 Payet', '34561', 0, '2022-05-17 11:54:18', NULL, NULL),
(33, 'est facilis ut', 'Itaque atque ut illum dolores. Ipsam odit natus quaerat quisquam. Minus fugit repellat ea omnis eaque sed.', 331, 10, 4, 7, 833962, 0, 'Cohen', '14, chemin Thibaut Dubois\n73 235 Barthelemy', '30 484', 0, '2022-05-17 11:54:18', NULL, NULL),
(34, 'consequuntur autem vel', 'Culpa facere quisquam dolor labore ea officiis qui. Et ea eos qui dolore est et. Aspernatur aliquam tempore delectus voluptatem voluptatem praesentium veritatis.', 251, 6, 7, 2, 682726, 0, 'Hernandez', '882, chemin Marcel Barbe\n32954 Coste', '33 600', 0, '2022-05-17 11:54:18', NULL, NULL),
(35, 'nihil officia illo', 'Molestiae assumenda natus consequatur. Ut fugit ut consequatur nisi voluptate. Velit asperiores consectetur a vel rem.', 112, 8, 4, 7, 679883, 1, 'Delahaye', '16, boulevard Danielle Georges\n66 928 Roy', '18746', 0, '2022-05-17 11:54:18', NULL, NULL),
(36, 'officiis tenetur sunt', 'Fuga eum illum ea sit et. Voluptatem dolores quos magnam. Consequatur earum sed asperiores fuga necessitatibus.', 328, 9, 7, 11, 774356, 0, 'Michaud', '149, chemin Klein\n97 209 Caron-la-Forêt', '85802', 0, '2022-05-17 11:54:18', NULL, NULL),
(37, 'culpa sit saepe', 'Unde dolorem sed sed id minus voluptas. Expedita repudiandae eius explicabo itaque aut et. Sequi sed aut et dolores sed saepe nostrum.', 118, 4, 7, 10, 735183, 0, 'Bernard', '70, rue Georges Gauthier\n58261 Michel', '22749', 0, '2022-05-17 11:54:18', NULL, NULL),
(38, 'quisquam saepe aliquam', 'Assumenda omnis voluptatem maiores qui odio rerum. Iusto a sint blanditiis pariatur. Non iusto aliquam ut harum.', 238, 9, 2, 7, 672382, 1, 'Chauveau', '66, impasse Françoise Dupuy\n90201 Humbert', '85435', 0, '2022-05-17 11:54:18', NULL, NULL),
(39, 'perspiciatis repudiandae non', 'Delectus quia occaecati perspiciatis odit dolorem odio exercitationem. Exercitationem et ad ullam molestias. Voluptas natus adipisci omnis magnam et voluptas voluptatem ut.', 214, 5, 5, 0, 465692, 1, 'Merle-sur-Ferrand', '268, avenue Prevost\n27 344 Besnardboeuf', '89 636', 0, '2022-05-17 11:54:18', NULL, NULL),
(40, 'commodi soluta atque', 'Temporibus voluptatibus quaerat nulla molestias nihil. Est nulla delectus eaque earum nihil voluptatem quia. Quas autem vero rerum alias vel.', 111, 6, 5, 4, 613482, 0, 'Vidal-sur-Mer', '8, rue Barbier\n61293 Lelievre', '89 462', 0, '2022-05-17 11:54:18', NULL, NULL),
(41, 'assumenda voluptate cum', 'Et sed aspernatur quod. Unde ut eos quis rerum rerum. Et tempore expedita omnis eos voluptates totam.', 37, 4, 5, 12, 686854, 0, 'Chretien', '46, rue Alfred Rocher\n73 592 Dufour', '13 474', 0, '2022-05-17 11:54:18', NULL, NULL),
(42, 'illo quia ut', 'Aperiam ea officiis facere molestiae repellendus unde cupiditate id. Eum tempore doloribus ipsam exercitationem odit consequatur. Architecto iusto repellat repellendus enim iste nulla sint.', 105, 4, 8, 5, 213635, 1, 'Bertrand', '95, place William Pasquier\n81974 Brunet-la-Forêt', '74521', 0, '2022-05-17 11:54:18', NULL, NULL),
(43, 'omnis ipsam non', 'Deserunt ut pariatur corporis a rerum quia alias animi. Aliquid non quas numquam corrupti ut sit. Ut accusantium a deserunt sint.', 65, 4, 4, 6, 330245, 0, 'Le Gall', 'rue de Neveu\n92 687 Lerouxdan', '28 719', 0, '2022-05-17 11:54:18', NULL, NULL),
(44, 'explicabo quam qui', 'Similique qui occaecati ratione vel nam consequatur. Illo explicabo ad velit. Ratione quos accusantium sapiente mollitia aut quasi rerum cum.', 166, 9, 8, 6, 627890, 0, 'Leclerc', '4, place de Merle\n22226 Charpentier-sur-Mer', '31311', 0, '2022-05-17 11:54:18', NULL, NULL),
(45, 'debitis modi culpa', 'Cupiditate excepturi voluptas commodi aliquid unde. Rerum quia voluptas consectetur ipsam iure esse. Tempora expedita debitis rerum maxime labore voluptas reprehenderit dignissimos.', 344, 4, 5, 0, 540496, 0, 'Gilbert', 'place de Menard\n85681 Couturier-sur-Lefort', '14 687', 0, '2022-05-17 11:54:18', NULL, NULL),
(46, 'itaque quod alias', 'Earum mollitia natus et et laboriosam ipsam nihil. Quia veniam natus in quia. Et delectus tempora aut.', 166, 8, 2, 10, 713268, 1, 'Muller-sur-Ruiz', '2, chemin Dominique Auger\n77 286 Mercier', '98414', 0, '2022-05-17 11:54:18', NULL, NULL),
(47, 'ea error dolor', 'Consequuntur quo cupiditate exercitationem. Sint ipsum doloremque fugit. Nisi consequatur sed assumenda.', 341, 6, 6, 15, 557737, 1, 'Guillon', '428, rue Fischer\n14741 Chauveau-sur-Bourgeois', '43 297', 0, '2022-05-17 11:54:18', NULL, NULL),
(48, 'aut in consectetur', 'Molestiae qui et voluptatibus quia aliquam recusandae. Et est est doloremque consequatur. Aperiam rerum libero cumque veniam nihil fugit architecto.', 67, 4, 3, 11, 469408, 0, 'Delannoy-sur-Leroy', '33, avenue de Chauveau\n33852 Bonnet-sur-Ribeiro', '64 237', 0, '2022-05-17 11:54:18', NULL, NULL),
(49, 'maiores reiciendis quis', 'Eos quisquam fugiat ab perspiciatis. Nesciunt quasi molestias et. Qui vel est sunt quia beatae eaque.', 299, 9, 10, 6, 657656, 0, 'Simon', '24, avenue de Blanc\n91022 Maillot-les-Bains', '05 645', 0, '2022-05-17 11:54:18', NULL, NULL),
(50, 'corporis provident cupiditate', 'Maiores expedita fugit nulla et sit quisquam quis. Ipsam facilis autem officiis cum animi sunt. Sit repudiandae necessitatibus voluptatem enim.', 185, 4, 6, 0, 457782, 0, 'Albertnec', '1, place William Martel\n55 386 Fernandes', '42 510', 0, '2022-05-17 11:54:18', NULL, NULL),
(51, 'quidem ipsa autem', 'Quos totam qui quia. Eius iure qui molestias harum tenetur. Aspernatur doloribus tempora quibusdam earum temporibus id.', 256, 6, 2, 3, 122802, 1, 'Lefort', '5, avenue Leroy\n11 321 Reynaud-sur-Louis', '24 961', 0, '2022-05-17 11:54:18', NULL, NULL),
(52, 'numquam porro animi', 'Nihil unde reiciendis beatae magnam. Rem eos omnis aut accusamus. Laborum facere rem in quo suscipit.', 36, 5, 2, 5, 800040, 0, 'MartinsBourg', '30, boulevard de Weber\n82 167 Foucher', '28248', 0, '2022-05-17 11:54:18', NULL, NULL),
(53, 'facere voluptates eaque', 'Possimus ea recusandae enim ut aperiam est deserunt. Nemo et natus ab quibusdam deleniti ut molestias. Dolor quae ad natus ut est.', 330, 2, 2, 15, 577749, 0, 'Buisson', '273, avenue Marin\n77516 DijouxVille', '11559', 0, '2022-05-17 11:54:18', NULL, NULL),
(54, 'possimus et omnis', 'Repellat cum atque at maiores dolorum molestiae autem. Similique voluptate ut vero qui et voluptates doloremque. Quia fugiat molestias sapiente quibusdam quidem est nihil.', 282, 9, 8, 14, 652052, 1, 'Devaux-sur-Seguin', 'boulevard de Louis\n54 285 VoisinVille', '82 844', 0, '2022-05-17 11:54:18', NULL, NULL),
(55, 'nihil iste consectetur', 'Eaque dicta eveniet tempore error quod. Molestias occaecati laboriosam accusamus. Eius earum quod dolor in praesentium.', 140, 8, 6, 5, 667278, 0, 'Langlois-sur-Mer', 'boulevard de Grenier\n86052 Ledoux-la-Forêt', '66884', 0, '2022-05-17 11:54:18', NULL, NULL),
(56, 'minus reprehenderit culpa', 'Sint adipisci sint ut et omnis. Eligendi aspernatur eligendi eaque exercitationem accusantium laborum est. Consequatur delectus delectus corporis doloremque ipsa.', 225, 9, 2, 15, 946117, 1, 'Nguyen', '62, rue Lucas Ferreira\n71 110 Remy', '26 421', 0, '2022-05-17 11:54:18', NULL, NULL),
(57, 'non tenetur assumenda', 'Delectus sequi dolorem inventore velit tempora non similique. Harum ex cum placeat officia esse. Voluptates perferendis vero porro sit soluta.', 82, 4, 5, 1, 359807, 1, 'Morel', '6, chemin de Guillou\n30179 Briandnec', '42 870', 0, '2022-05-17 11:54:18', NULL, NULL),
(58, 'cumque dolores reprehenderit', 'Nemo et dolorem necessitatibus doloribus in similique delectus. Ea aliquam dignissimos rerum modi quia. Aut id est veniam.', 276, 5, 3, 5, 328781, 0, 'Le Gall', '865, impasse Vidal\n38030 Maurice-sur-Denis', '31358', 0, '2022-05-17 11:54:18', NULL, NULL),
(59, 'tempore qui qui', 'Consequatur vel consequuntur sit neque dolorum. Qui in est soluta sed eveniet magnam consequatur officiis. Cum doloribus nostrum distinctio quisquam minus sit facere.', 208, 3, 7, 1, 225227, 1, 'Thomas-la-Forêt', '62, chemin de Bourdon\n07795 Descampsdan', '81 098', 0, '2022-05-17 11:54:18', NULL, NULL),
(60, 'labore soluta eaque', 'Hic eos aut eum architecto est ipsam numquam. Voluptas earum sint maxime architecto. Ea sequi expedita eum quia at et dolorem.', 113, 4, 5, 2, 314563, 0, 'Bonneau', '87, rue Bailly\n67823 Collin-les-Bains', '30 817', 0, '2022-05-17 11:54:18', NULL, NULL),
(61, 'optio eaque at', 'Et dolores non dicta ducimus. Excepturi recusandae cumque deleniti et ad eos. Voluptatem laborum ad beatae distinctio qui.', 276, 4, 3, 6, 765981, 0, 'Remy-sur-Caron', '52, impasse Launay\n96 531 Rogernec', '48797', 0, '2022-05-17 11:54:18', NULL, NULL),
(62, 'culpa fugiat quia', 'Fugit neque vel sit recusandae velit exercitationem. Est consequatur nobis molestias sed. Corporis sint ullam magni natus consectetur ad.', 212, 7, 10, 9, 946225, 0, 'Guyon-sur-Mer', '191, chemin Fontaine\n67 735 Godard-sur-Mer', '46 333', 0, '2022-05-17 11:54:18', NULL, NULL),
(63, 'ut aut neque', 'Excepturi ullam voluptas esse laborum architecto repudiandae. Aperiam consequatur voluptate dolor error. Vel alias mollitia omnis fuga.', 88, 6, 9, 15, 972948, 1, 'Nguyen-la-Forêt', '558, place de Leclerc\n77962 Picarddan', '24 086', 0, '2022-05-17 11:54:18', NULL, NULL),
(64, 'est autem rem', 'Nihil enim culpa tempora aut quis fugiat. Tempore nostrum nostrum harum at in ea. Accusantium maxime delectus dolorum est incidunt.', 122, 4, 5, 8, 976956, 0, 'Da Silvaboeuf', '66, boulevard de Dupuy\n71692 Charpentier', '94120', 0, '2022-05-17 11:54:18', NULL, NULL),
(65, 'magni facere rerum', 'Excepturi ex nemo qui. Dolores est temporibus aliquid enim. Error voluptates unde explicabo itaque autem.', 229, 2, 9, 15, 729007, 1, 'LefebvreVille', '6, avenue Inès Munoz\n72912 Lebreton-sur-Vincent', '15755', 0, '2022-05-17 11:54:18', NULL, NULL),
(66, 'voluptate ut harum', 'Voluptate corporis rem delectus non totam quo tenetur corporis. Aut est consequatur molestiae sapiente. Voluptatem voluptas fuga eius quisquam.', 162, 10, 2, 9, 367641, 1, 'Allard-sur-Masson', '15, chemin Hortense Gonzalez\n22 602 Pichon', '70 262', 0, '2022-05-17 11:54:18', NULL, NULL),
(67, 'similique ipsum ut', 'Quaerat dignissimos et inventore laboriosam sed beatae. Iure nobis itaque accusamus et omnis ipsum. Repellat neque non labore dolore blanditiis minus.', 79, 10, 3, 14, 113889, 1, 'Millet-sur-Maury', '606, chemin Sylvie Legros\n77875 Leclercq', '27 851', 0, '2022-05-17 11:54:18', NULL, NULL),
(68, 'dolorem labore dicta', 'Libero ut dolor et reiciendis. Commodi saepe aliquid velit quasi. Repudiandae et in magni iusto.', 320, 8, 2, 15, 230476, 1, 'Gilles', '700, chemin de Martineau\n09 825 Thomasdan', '83 848', 0, '2022-05-17 11:54:18', NULL, NULL),
(69, 'quidem architecto in', 'Temporibus dolor deserunt placeat odit asperiores recusandae asperiores adipisci. Corporis consequuntur ipsa molestiae dolore voluptatem alias ratione. Recusandae deserunt architecto id velit ut earum ratione.', 138, 6, 4, 12, 427065, 1, 'Vasseur', 'boulevard Ribeiro\n40 089 Lebreton', '42 544', 0, '2022-05-17 11:54:18', NULL, NULL),
(70, 'expedita autem quis', 'Qui quo sit consequatur blanditiis ut modi. Hic eum aut hic nam. Quis et est quisquam provident vel.', 251, 2, 9, 12, 998054, 0, 'Alexandre-sur-Roussel', '33, place Andre\n59742 PeltierBourg', '44 747', 0, '2022-05-17 11:54:18', NULL, NULL),
(71, 'quos ipsum voluptas', 'Sit sunt esse aperiam praesentium reiciendis sit consequatur. Autem libero quibusdam unde perspiciatis quia incidunt aut ad. Dolorem quas quo aut id illo.', 191, 5, 9, 14, 209397, 0, 'Clement', 'rue Morvan\n54 574 BuissonVille', '22 149', 0, '2022-05-17 11:54:18', NULL, NULL),
(72, 'esse omnis delectus', 'Id error sit et quo quos. Voluptatibus dolores officiis culpa deleniti repellendus officia quia quas. Magnam est consequatur sed aut reiciendis voluptas ex.', 90, 2, 6, 9, 839630, 1, 'Payet', '8, chemin Stéphane Levy\n54887 Leleuboeuf', '35361', 0, '2022-05-17 11:54:18', NULL, NULL),
(73, 'omnis aut qui', 'Unde error sunt aut ut adipisci velit. Modi quis laborum distinctio dolorum perspiciatis ad itaque. Reiciendis sapiente cupiditate officiis doloremque.', 35, 6, 6, 1, 394410, 0, 'Rousseaudan', '231, avenue Anastasie Guillet\n84628 Parisnec', '67 614', 0, '2022-05-17 11:54:18', NULL, NULL),
(74, 'est et facere', 'Numquam veritatis voluptas illum et dolorem temporibus voluptas. Et quod eos minima et. Voluptates fugiat qui et sit enim.', 54, 5, 10, 0, 781558, 1, 'Bonneau', '2, rue Leconte\n23 638 Bonneau', '30 354', 0, '2022-05-17 11:54:18', NULL, NULL),
(75, 'dignissimos illo tenetur', 'Quia molestiae ullam illum labore autem. Sed delectus vitae aliquid et in. Architecto architecto omnis vel laboriosam.', 217, 3, 8, 13, 146416, 1, 'Leroy-les-Bains', '35, boulevard de Lacombe\n95 372 Guyot-sur-Mer', '61 491', 0, '2022-05-17 11:54:18', NULL, NULL),
(76, 'laborum molestiae et', 'Autem ratione blanditiis laudantium error aspernatur. Tenetur ut facilis natus dolores doloremque sint et. Assumenda quia delectus aut in.', 173, 4, 6, 1, 546053, 1, 'Bonneau-la-Forêt', 'place de Turpin\n36800 Pelletier-la-Forêt', '03 149', 0, '2022-05-17 11:54:18', NULL, NULL),
(77, 'quidem error ipsam', 'Et est non dolor et rerum. Iure voluptas tenetur asperiores qui est nemo. Cupiditate totam illum temporibus placeat quaerat porro aut.', 276, 7, 2, 6, 675855, 0, 'Remy-sur-Sauvage', '68, avenue Josette Turpin\n09749 Goncalves', '70888', 0, '2022-05-17 11:54:18', NULL, NULL),
(78, 'labore qui sit', 'Accusantium totam deleniti pariatur suscipit. Consequatur pariatur dolorem est et beatae ut. Perferendis soluta necessitatibus quasi necessitatibus eum.', 60, 4, 3, 15, 814335, 1, 'Fournier-sur-De Sousa', 'impasse de Lamy\n29591 Lebon-sur-Navarro', '96559', 0, '2022-05-17 11:54:18', NULL, NULL),
(79, 'autem maiores temporibus', 'Necessitatibus iusto occaecati nihil accusamus. Rerum nisi quo dolores facere magnam aut. Voluptatem vitae eaque qui blanditiis omnis autem.', 257, 10, 7, 1, 940100, 1, 'Gros', '7, avenue Alexandrie Humbert\n19 423 Carlierboeuf', '93 946', 0, '2022-05-17 11:54:18', NULL, NULL),
(80, 'ut et dolor', 'Nihil aspernatur voluptatibus vel magnam voluptates tempora et. Aperiam ut facere alias perferendis est. Maiores error officiis aliquid dolores similique magnam.', 248, 4, 8, 15, 213699, 1, 'Fontaine', 'rue de Weiss\n83 517 Benardboeuf', '13 942', 0, '2022-05-17 11:54:18', NULL, NULL),
(81, 'sed doloribus facere', 'Voluptatibus in tenetur iste sed dolorum earum voluptas qui. Omnis laudantium saepe accusantium. Animi consequatur quia neque id cum assumenda voluptatem.', 79, 2, 5, 9, 342412, 1, 'LeblancBourg', '621, rue de Guillot\n14869 LangloisVille', '51 369', 0, '2022-05-17 11:54:18', NULL, NULL),
(82, 'id provident dolor', 'Quisquam eum quos pariatur impedit architecto. Ducimus porro eum aut maxime quas omnis doloremque. Est eos et dolorum accusamus placeat porro quas.', 231, 6, 4, 13, 893314, 1, 'Raynaud', '348, rue Bertrand Colas\n43254 Regnier', '42 491', 0, '2022-05-17 11:54:18', NULL, NULL),
(83, 'voluptas voluptate quae', 'Qui quaerat voluptas aut laudantium ut. Quos qui voluptates eum repellat vero eum. Suscipit suscipit voluptas officia repudiandae eos quas earum quam.', 88, 4, 5, 11, 311517, 0, 'Denis-la-Forêt', '763, boulevard de Carre\n52 188 Julien', '49594', 0, '2022-05-17 11:54:18', NULL, NULL),
(84, 'cupiditate eligendi eaque', 'Laborum voluptatem impedit beatae placeat. Dolore voluptatum ab quaerat qui earum necessitatibus ipsum. Aut voluptates nemo est corporis pariatur doloremque dolorum.', 38, 10, 7, 8, 494232, 0, 'RobinVille', '466, impasse Guilbert\n96 876 Lopez-la-Forêt', '47315', 0, '2022-05-17 11:54:18', NULL, NULL),
(85, 'perferendis est veritatis', 'Dolores sit similique laborum sit. Sed aut at odio et quos in. Quo consectetur modi modi ut molestiae facere ut.', 227, 7, 9, 13, 345492, 0, 'Marchand', 'place de Meunier\n36 714 Ferrand', '49 762', 0, '2022-05-17 11:54:18', NULL, NULL),
(86, 'aspernatur tenetur possimus', 'Quo ducimus est nostrum facere sint dicta sint. Sed commodi magnam qui consequatur voluptatem praesentium. Ut et qui eum praesentium voluptatum dolor modi ad.', 83, 8, 3, 11, 307546, 1, 'Berthelotnec', '7, place Émilie Blin\n08909 Fernandes', '56 500', 0, '2022-05-17 11:54:18', NULL, NULL),
(87, 'architecto temporibus non', 'Minima porro laboriosam doloremque et. Quia mollitia rerum quibusdam possimus fugiat quia tempore. Nesciunt ut qui hic nisi fugit.', 251, 5, 8, 2, 502889, 1, 'Brunet', '1, place Dupuy\n00 519 Couturier-sur-Humbert', '89957', 0, '2022-05-17 11:54:18', NULL, NULL),
(88, 'autem atque dolorum', 'Inventore non nesciunt corrupti cupiditate iusto earum quis aperiam. Dolorem harum totam et omnis natus. Odit quo molestias et praesentium tempore voluptate.', 254, 5, 10, 13, 484505, 1, 'Ledoux', '99, place Antoine\n07 507 Jacob', '96 089', 0, '2022-05-17 11:54:18', NULL, NULL),
(89, 'itaque vel accusantium', 'Laudantium beatae incidunt officia voluptatibus dolore facilis sit. Nemo sint omnis dolor praesentium eum aut. Nobis voluptas fugit qui accusamus corporis veritatis quia.', 272, 2, 2, 13, 385367, 0, 'Roger', '10, place Paulette Charles\n86 944 Adam', '12 547', 0, '2022-05-17 11:54:18', NULL, NULL),
(90, 'ex incidunt officiis', 'Ut non a sit est vitae minus. Nostrum ea facilis rerum inventore. Ut possimus voluptas ab et aspernatur rem incidunt voluptatem.', 199, 2, 8, 12, 618863, 1, 'SchmittBourg', '26, boulevard Matthieu Vallet\n57 621 HumbertBourg', '29069', 0, '2022-05-17 11:54:18', NULL, NULL),
(91, 'placeat modi nihil', 'Quia distinctio aut saepe dicta itaque voluptatem debitis perferendis. Eos enim tempore reiciendis occaecati inventore. Ut molestiae omnis impedit cum.', 184, 3, 8, 13, 399512, 1, 'Guyonnec', '171, place Philippe Barthelemy\n11 819 Antoine-sur-Lacroix', '40 263', 0, '2022-05-17 11:54:18', NULL, NULL),
(92, 'non hic eveniet', 'Perferendis deleniti aut autem aliquid eius rerum sit. Est ab unde blanditiis impedit quod mollitia non consequatur. Vitae aut iure sint.', 335, 5, 10, 3, 425849, 1, 'Lecomte', '69, boulevard de Gaillard\n95 475 Cousin', '21413', 0, '2022-05-17 11:54:18', NULL, NULL),
(93, 'et dolorem perspiciatis', 'Voluptatem iure animi sapiente. Unde fuga qui id provident et cum. Modi enim officia laboriosam ipsam.', 210, 4, 10, 14, 156694, 0, 'Weberdan', '207, impasse Girard\n50 323 Carlier-les-Bains', '21791', 0, '2022-05-17 11:54:18', NULL, NULL),
(94, 'est sed et', 'Laborum cum saepe possimus. Nostrum vero soluta adipisci voluptas quae. Et minus eum et ut modi expedita officia ratione.', 87, 5, 5, 12, 249169, 0, 'Gosselin', '66, chemin Deschamps\n72287 Bigot', '80 657', 0, '2022-05-17 11:54:18', NULL, NULL),
(95, 'blanditiis aut fugit', 'Enim repudiandae voluptates perferendis. Ut ipsa corrupti illo adipisci quo repellendus velit itaque. Ut beatae impedit quia enim temporibus illo aut.', 55, 2, 5, 7, 979611, 1, 'Durand', '3, boulevard Jacquot\n39786 Thomas', '10 483', 0, '2022-05-17 11:54:18', NULL, NULL),
(96, 'natus libero autem', 'Omnis corporis sed voluptas voluptate eius omnis. Labore et qui est tempora consequuntur et expedita. Sunt quia doloribus culpa est.', 202, 6, 10, 13, 129899, 1, 'Guillaume', '84, avenue de Thomas\n48 916 Vaillantboeuf', '10 895', 0, '2022-05-17 11:54:18', NULL, NULL),
(97, 'recusandae nisi adipisci', 'Tempore corrupti reprehenderit est voluptas et dolores labore velit. Libero dolores nemo voluptates ut similique. Sapiente et corrupti autem rem sunt adipisci qui sunt.', 320, 10, 7, 0, 497703, 1, 'Michel', '38, rue Hélène Weber\n95 522 Perrin', '03359', 0, '2022-05-17 11:54:18', NULL, NULL),
(98, 'ut cumque nobis', 'Omnis qui saepe ipsam omnis. Expedita officia reprehenderit officia odio id dolores. Eius dolorem quis nemo sapiente occaecati dolor architecto.', 267, 8, 5, 7, 370257, 0, 'Brunet', '819, impasse de Gilbert\n18 832 Blot', '08 206', 0, '2022-05-17 11:54:18', NULL, NULL),
(99, 'sint possimus laudantium', 'Sunt odio voluptatem est quia odio voluptatum commodi possimus. Eveniet corrupti animi ut. Qui sit possimus quidem vitae facilis ex.', 66, 5, 8, 8, 267983, 0, 'Mace', '46, rue Lucas Moulin\n62 880 Maillet', '93 919', 0, '2022-05-17 11:54:18', NULL, NULL),
(100, 'et sit quos', 'Dignissimos fugit temporibus voluptate. Fugit debitis eos quos ea voluptatum. Culpa tempore sunt culpa architecto.', 231, 10, 8, 2, 690206, 0, 'Fischer-sur-Pascal', '944, place Vincent Delahaye\n75 121 Munoz-les-Bains', '17156', 0, '2022-05-17 11:54:18', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `property_option`
--

CREATE TABLE `property_option` (
  `property_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`) VALUES
(1, 'demo', '[]', '$2y$04$PADQV4l5ZAG8SbwuMsD5v.REFZOFks9ZZC0DxCe/LetLRi8DkrZUu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `option`
--
ALTER TABLE `option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property_option`
--
ALTER TABLE `property_option`
  ADD PRIMARY KEY (`property_id`,`option_id`),
  ADD KEY `IDX_24F16FCC549213EC` (`property_id`),
  ADD KEY `IDX_24F16FCCA7C41D6F` (`option_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649F85E0677` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `option`
--
ALTER TABLE `option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `property_option`
--
ALTER TABLE `property_option`
  ADD CONSTRAINT `FK_24F16FCC549213EC` FOREIGN KEY (`property_id`) REFERENCES `property` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_24F16FCCA7C41D6F` FOREIGN KEY (`option_id`) REFERENCES `option` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
