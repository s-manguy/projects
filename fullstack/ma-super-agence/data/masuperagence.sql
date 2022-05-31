-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 31, 2022 at 06:54 AM
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
-- Database: `masuperagence`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20220216064702', '2022-02-16 07:10:08', 74),
('DoctrineMigrations\\Version20220216073300', '2022-02-16 07:33:56', 81),
('DoctrineMigrations\\Version20220218065756', '2022-02-18 06:58:12', 132),
('DoctrineMigrations\\Version20220222081621', '2022-02-22 08:17:56', 144),
('DoctrineMigrations\\Version20220223050909', '2022-02-23 05:11:09', 136),
('DoctrineMigrations\\Version20220223060926', '2022-02-23 06:09:43', 138);

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
(1, 'Balcon'),
(2, 'Adapté PMR'),
(3, 'Ascenseur');

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
(108, 'aut maiores exercitationem', 'Eum facilis dignissimos labore harum atque nihil suscipit. Velit et adipisci est cum vero et illo. Eos et qui aut necessitatibus ut officiis fugiat.', 289, 5, 4, 13, 581315, 1, 'Blin', '69, rue de Dos Santos81963 Roussel-sur-Gaillard', '94316', 0, '2022-02-21 07:42:26', '6282a3b468cf8082897821.jpg', '2022-05-16 19:19:16'),
(109, 'repudiandae placeat et', 'Commodi aut cumque officia vero fugit quos sunt. Et aliquam neque veritatis accusamus voluptas labore aliquam. At omnis quo consequatur incidunt temporibus hic voluptates quia.', 115, 7, 8, 4, 175028, 0, 'Letellier', '866, rue Chantal Leger11609 Albert-sur-Rousseau', '05897', 0, '2022-02-21 07:42:26', '', NULL),
(110, 'consectetur rerum enim', 'Odio accusantium est eius distinctio rerum. Maiores sit eum omnis. Omnis sint corporis eius cum id libero.', 198, 10, 10, 12, 411132, 0, 'Gimenez', '18, place Anaïs Guerin62991 Barbe', '16977', 0, '2022-02-21 07:42:26', '', NULL),
(112, 'cum commodi aut', 'Dolorum ab dolores repellat tempora. Voluptatibus voluptates tempore molestiae magni explicabo nobis odio. Est consequatur quia magnam molestias quas eveniet sit.', 109, 7, 9, 1, 462632, 0, 'Becker-la-Forêt', '5, impasse Allain\n94 957 LefebvreVille', '12 013', 0, '2022-02-21 07:42:26', '', NULL),
(113, 'asperiores veritatis dolores', 'Molestiae perspiciatis accusamus sit alias repellat et ipsam. Et nemo expedita pariatur qui. Dolores qui quisquam nisi.', 209, 9, 2, 5, 796092, 0, 'Gosselin', '756, chemin Pelletier\n80 916 MichaudBourg', '44887', 0, '2022-02-21 07:42:26', '', NULL),
(114, 'repudiandae dignissimos minima', 'Qui modi deleniti illum facilis. Ab quia blanditiis incidunt explicabo ad. In molestiae sed id sunt perspiciatis.', 261, 3, 2, 0, 216819, 0, 'Mailletnec', '44, place Charles Baron93 310 Fabre', '16892', 0, '2022-02-21 07:42:26', '', NULL),
(115, 'accusamus minima error', 'Magnam aliquid sapiente consequatur. Aut harum in error sunt veritatis quibusdam. Sunt aliquam eligendi cumque eum maiores aut modi laboriosam.', 165, 5, 4, 10, 288060, 0, 'Auger', '8, chemin de Garnier\n25 361 DijouxVille', '86380', 0, '2022-02-21 07:42:26', '', NULL),
(117, 'ipsum ad vero', 'Doloribus quas voluptatibus in quia. Nam omnis quasi neque. Ab ipsa voluptas qui deleniti ex.', 134, 6, 10, 6, 531457, 1, 'Besnard-les-Bains', '8, avenue de Tessier\n86763 Morel', '67 180', 0, '2022-02-21 07:42:26', '', NULL),
(118, 'laborum non itaque', 'Deleniti doloremque ut nisi ducimus corporis mollitia. Dicta rem eligendi necessitatibus aut est vero non. Aut ut quia totam.', 246, 2, 10, 11, 122224, 0, 'Colin-la-Forêt', 'boulevard de Bernier\n76469 Ferreira-sur-Mer', '74800', 0, '2022-02-21 07:42:26', '', NULL),
(120, 'ducimus voluptatibus aut', 'Molestiae et consequatur earum deleniti architecto. Quis molestiae vel itaque id impedit. Et rem commodi quaerat est sint aliquam et numquam.', 271, 8, 10, 4, 686578, 0, 'Dubois', '84, rue de Joseph\n71 592 Aubertdan', '61 514', 0, '2022-02-21 07:42:26', '', NULL),
(121, 'quis repudiandae praesentium', 'Minima est dolorum delectus et. Id repellat minima id ad. Ut ab atque eveniet unde at.', 274, 9, 4, 4, 159632, 0, 'Rousset', 'rue Anne Paris\n19243 Poirier-sur-Masson', '38 127', 0, '2022-02-21 07:42:26', '', NULL),
(122, 'libero debitis molestiae', 'Aliquid ut tempore sint quod non sapiente. Quasi est sunt rerum eos optio laboriosam dolores. Voluptatem architecto aut corrupti magni dolores dolorem et.', 272, 4, 2, 0, 482881, 1, 'Delahaye-sur-Guerin', 'rue de Vidal\n90153 De Oliveira', '55 515', 0, '2022-02-21 07:42:26', '', NULL),
(123, 'in placeat officia', 'Architecto quae quibusdam assumenda earum quis ullam. Ad molestias aut aliquam impedit consequuntur. Itaque quidem minima laborum.', 271, 4, 5, 6, 268353, 1, 'Cohen-les-Bains', '5, rue Auguste Moulin\n13785 Rossi', '92527', 0, '2022-02-21 07:42:26', '', NULL),
(124, 'ea qui voluptatibus', 'Voluptates iure quos animi magni maxime nemo. Iure unde voluptatem deserunt soluta et. Aut minus ad quis quia omnis harum enim.', 265, 6, 9, 6, 278060, 0, 'Marchal-sur-Martineau', '96, chemin de Julien\n40 466 Da Silva-les-Bains', '68451', 0, '2022-02-21 07:42:26', '', NULL),
(125, 'cupiditate nemo explicabo', 'Voluptatum sed voluptas sit nostrum et quos harum provident. Sed perspiciatis quis sint voluptatem voluptate. Quaerat voluptatem cum consequuntur et voluptatem delectus eum.', 145, 4, 9, 10, 662786, 1, 'Evrardnec', '77, place de Vidal\n60 532 MeyerBourg', '05057', 0, '2022-02-21 07:42:26', '', NULL),
(126, 'neque nihil sed', 'Molestiae at aperiam magni doloremque ut. Exercitationem et esse ipsum porro. Eligendi natus quasi dolorum et delectus.', 176, 7, 8, 6, 273857, 1, 'BernierBourg', 'impasse de Normand\n05316 Poulain-sur-Mer', '27 730', 0, '2022-02-21 07:42:26', '', NULL),
(127, 'nisi est sed', 'Eos qui ipsum doloremque. Fugit omnis tempore quia rem. Velit et enim autem.', 109, 2, 10, 7, 907889, 0, 'Masse', '51, avenue de Gay\n74644 Perrot', '69 331', 0, '2022-02-21 07:42:26', '', NULL),
(128, 'et numquam culpa', 'Neque aut aut modi nesciunt. Repudiandae ad voluptatem veritatis voluptates deleniti voluptas. Est qui a autem optio.', 111, 4, 3, 9, 780476, 0, 'Marty', '87, rue de Rocher\n46 183 PerrierBourg', '82 093', 0, '2022-02-21 07:42:26', '', NULL),
(129, 'et eaque ea', 'Commodi aliquid voluptatibus voluptatum cupiditate quam. Cupiditate perspiciatis autem sint harum et corporis ullam. Et ut vel quo.', 193, 8, 9, 11, 428520, 0, 'Lefort', '97, rue Josette Mendes\n78 100 Chevallier', '01 671', 0, '2022-02-21 07:42:26', '', NULL),
(130, 'mollitia nulla aut', 'Quos perspiciatis quasi atque consectetur non a. Impedit earum voluptate officia. Officiis quasi iusto et eos.', 34, 4, 7, 12, 802429, 0, 'Caron-sur-Riviere', '80, place de Martel\n36 398 Joubert-sur-Mer', '71012', 0, '2022-02-21 07:42:26', '', NULL),
(131, 'quia eos possimus', 'Et quisquam praesentium officia magnam. Et est dolorem accusantium quasi. Quasi eos voluptatibus aut minus totam voluptas.', 268, 6, 5, 1, 444791, 1, 'Potier', '1, chemin Adélaïde Collet\n76095 Monnier-sur-Peron', '51 454', 0, '2022-02-21 07:42:26', '', NULL),
(132, 'iusto et sit', 'Inventore quam animi ad cum laudantium ullam et et. Fugiat non cum omnis voluptatibus ut. Quis et pariatur aut sit quia ut.', 281, 9, 9, 10, 314532, 1, 'Chartier', '9, boulevard Margaret Bouvier\n40 774 Goncalves', '24498', 0, '2022-02-21 07:42:26', '', NULL),
(133, 'dolores numquam necessitatibus', 'Minus pariatur voluptatem itaque necessitatibus. Libero odio accusantium id nobis modi quis aut. Eius praesentium in doloribus accusamus omnis.', 292, 2, 3, 14, 649720, 1, 'Blin', 'place de Delaunay\n47424 Bonneau', '19495', 0, '2022-02-21 07:42:26', '', NULL),
(134, 'rem non optio', 'Et deserunt ut eum. Laudantium deserunt aperiam quisquam dolore. Quia provident voluptatum eum assumenda eum sit odit sed.', 152, 7, 4, 5, 879313, 0, 'Germain-la-Forêt', '1, impasse de Potier\n13 524 Roger', '97 235', 0, '2022-02-21 07:42:26', '', NULL),
(135, 'aut quos nisi', 'Nihil quasi non aperiam hic sapiente iste nulla eaque. Alias sed expedita architecto earum dolor aspernatur. Sit exercitationem qui harum sunt.', 152, 9, 10, 4, 801411, 1, 'Jacquet', '761, rue Édouard Descamps\n88174 Chevalier-la-Forêt', '05687', 0, '2022-02-21 07:42:26', '', NULL),
(136, 'dolores sit unde', 'Consequatur velit eos tempore et nihil impedit. Repellat omnis sunt maiores aperiam commodi. Dolor nulla velit earum et tenetur.', 290, 2, 2, 4, 968392, 1, 'Boucher', '889, rue Valérie Laporte\n63700 Guilbert', '71258', 0, '2022-02-21 07:42:26', '', NULL),
(137, 'quaerat delectus corrupti', 'Minus ipsa fugit nobis dolores. Quia ipsum aut rerum nostrum omnis. Voluptatem at sint sequi soluta ut.', 127, 8, 8, 5, 561334, 0, 'Joubert', '5, place Arnaud\n23 270 Joly', '58641', 0, '2022-02-21 07:42:26', '', NULL),
(138, 'eius sint numquam', 'Fuga architecto quo eaque perferendis aspernatur. In voluptatem quod exercitationem eum sint repellat. Aliquid repudiandae minima ut placeat voluptates.', 66, 8, 5, 14, 802607, 1, 'Richard', '93, boulevard Gimenez\n25850 Gautier', '26 071', 0, '2022-02-21 07:42:26', '', NULL),
(139, 'voluptatem sunt est', 'Ut facere laudantium nulla provident totam velit. Aut nobis ab aut eum vel nulla corrupti. Rem exercitationem a ut minus facere voluptas.', 22, 7, 10, 7, 946467, 0, 'Bernard', '955, boulevard de Descamps\n02345 ClementVille', '81513', 0, '2022-02-21 07:42:26', '', NULL),
(140, 'ducimus recusandae expedita', 'Vero qui id et voluptatibus accusantium quidem alias. Dolorem qui quisquam enim cumque similique fugiat. Eius assumenda molestiae id enim voluptas nesciunt molestiae.', 144, 6, 8, 5, 644792, 0, 'Massonboeuf', '4, rue Louise Rousset\n29 581 Begue', '40 262', 0, '2022-02-21 07:42:26', '', NULL),
(141, 'qui temporibus sed', 'Rerum consequatur dolor unde eos numquam nam provident. Eum at aut cum excepturi excepturi dolorem ut aut. Reprehenderit incidunt et voluptas fugit.', 60, 7, 9, 3, 999016, 1, 'Roger', '49, place Odette Andre\n58 150 Robert-sur-Mer', '79 563', 0, '2022-02-21 07:42:26', '', NULL),
(142, 'placeat nesciunt porro', 'Porro vel temporibus aliquid odio iure quia aliquid porro. Minima vero accusamus consectetur vero perferendis enim sunt animi. Enim similique aut deserunt et.', 244, 7, 10, 5, 930938, 0, 'Rousset-sur-Chevallier', '52, avenue Marion\n21126 Renaudboeuf', '62545', 0, '2022-02-21 07:42:26', '', NULL),
(143, 'ut omnis sint', 'Quasi ut quis eos voluptatem qui. Dolor dicta alias sint sit dolore. Veritatis odio consectetur quia facere voluptatem.', 253, 9, 4, 11, 392631, 1, 'Brunel', 'impasse de Launay\n32499 LefevreVille', '26 478', 0, '2022-02-21 07:42:26', '', NULL),
(144, 'quia officia unde', 'Distinctio et voluptatem velit tempore. Eaque illum enim aut quam minima inventore. Ratione dolorem magnam placeat maxime magnam aut.', 155, 9, 8, 2, 701370, 1, 'Lopez-sur-Masse', '36, impasse Hélène Bonneau\n50125 Laroche', '31 263', 0, '2022-02-21 07:42:26', '', NULL),
(145, 'quam et esse', 'Quos voluptas ratione animi culpa vel voluptatem. Quam ut quam atque saepe qui. Perferendis dolorem et quisquam rerum delectus et.', 211, 6, 6, 7, 793355, 1, 'Lemaitre-sur-Valentin', '19, chemin Bruneau\n59 929 Colletnec', '06376', 0, '2022-02-21 07:42:26', '', NULL),
(146, 'optio est fugiat', 'Incidunt consectetur quam ullam voluptatem ullam dolores. Ex tempora sed ea fugiat corrupti voluptatem. Odio qui quia eos aut tempore.', 179, 2, 5, 13, 824037, 0, 'Da Costa', '1, rue Renée Noel\n68 846 Foucher', '50166', 0, '2022-02-21 07:42:26', '', NULL),
(147, 'odio earum beatae', 'Dolor qui nulla odio exercitationem hic. Delectus velit veniam beatae excepturi. Veniam et consequatur enim.', 269, 8, 6, 2, 153335, 1, 'Muller', '42, chemin de Da Costa\n05533 Marchal', '64 407', 0, '2022-02-21 07:42:26', '', NULL),
(148, 'natus modi illum', 'Velit itaque quis enim suscipit error excepturi. Ab harum architecto numquam consectetur sit. Blanditiis error illo quia.', 30, 2, 4, 5, 612524, 0, 'Perez-sur-Le Roux', 'chemin de Delattre\n65795 Da Silva-sur-Jacquet', '32457', 0, '2022-02-21 07:42:26', '', NULL),
(149, 'quia consequuntur dolore', 'Dolor velit aut rem aut ratione. Mollitia voluptas perspiciatis labore ut ut magni. Aut officia vel aut iusto quia aperiam.', 115, 2, 7, 1, 164283, 0, 'Picard', '33, rue Bernier\n27854 Renaud', '10 532', 0, '2022-02-21 07:42:26', '', NULL),
(150, 'praesentium saepe ut', 'Ex deserunt laboriosam consequatur eos et totam consequatur. Nihil facere odit voluptatem consectetur. Aliquid impedit quaerat fuga sequi.', 99, 6, 6, 13, 998905, 1, 'Lemaitre', '12, avenue de Le Gall\n13743 Alexandre', '87 046', 0, '2022-02-21 07:42:26', '', NULL),
(151, 'excepturi et facilis', 'Distinctio error occaecati dolore aut maxime est. Consequuntur itaque dignissimos dolorum non consequatur. Laboriosam voluptatem omnis debitis enim aut ex.', 122, 2, 10, 10, 126597, 1, 'Buisson', '13, avenue Frédéric Perret\n58141 Lacombe', '39598', 0, '2022-02-21 07:42:26', '', NULL),
(152, 'doloribus maiores dolorem', 'Id voluptatibus aspernatur voluptatem sit voluptas consequuntur doloribus. Est aut expedita aut quis saepe sint incidunt consequatur. Non et nihil quae et hic fuga itaque et.', 295, 4, 4, 4, 736469, 0, 'Fernandez', '99, chemin Andrée Alves\n86710 Fleury', '35387', 0, '2022-02-21 07:42:26', '', NULL),
(153, 'aut nulla molestias', 'Consequatur officiis omnis deleniti dolorem ducimus totam quis. Explicabo soluta non provident voluptate. Est similique delectus maxime nemo voluptate a sunt.', 24, 10, 3, 3, 170418, 0, 'Jacques', '86, place Jacquot\n05905 Boutin', '99 798', 0, '2022-02-21 07:42:26', '', NULL),
(154, 'quibusdam maiores provident', 'Laborum in vero quia a qui quidem. Rerum omnis voluptates velit ipsam fugiat cum. At ut vero amet vel tenetur.', 289, 9, 4, 5, 581670, 0, 'Samson', '30, rue Gonzalez\n21 884 FrancoisVille', '64 710', 0, '2022-02-21 07:42:26', '', NULL),
(155, 'voluptas impedit illo', 'Animi reiciendis nihil modi non voluptas quae quis. Laboriosam animi debitis ad cumque. Ut et possimus beatae voluptatem deleniti.', 119, 3, 4, 9, 435017, 1, 'TessierBourg', 'avenue de Ruiz\n16259 HamelBourg', '31823', 0, '2022-02-21 07:42:26', '', NULL),
(156, 'qui labore dolor', 'Tempore facere dolor reiciendis excepturi dolor qui. Animi qui ad molestiae et voluptatem qui non ipsa. Error et voluptas eaque laboriosam numquam voluptatem.', 331, 2, 6, 11, 626874, 1, 'Texier', 'chemin Pénélope Marechal\n94 482 Maury', '26818', 0, '2022-02-21 07:42:26', '', NULL),
(157, 'quo magni cum', 'Ea esse numquam esse odit quae. Sed hic voluptate suscipit atque libero consequatur exercitationem. Accusantium accusantium suscipit necessitatibus voluptate doloremque.', 276, 2, 7, 2, 106037, 1, 'Launay-sur-Levy', '757, rue Adrien Klein\n38 042 Charpentier', '70727', 0, '2022-02-21 07:42:26', '', NULL),
(158, 'deserunt fugiat omnis', 'Recusandae molestiae et et minus fugiat harum quasi quibusdam. Perferendis et in omnis iure vero omnis. Voluptatem incidunt inventore molestiae voluptatum natus molestias.', 173, 5, 2, 12, 360781, 0, 'Clement', '223, impasse de Ferrand\n55 116 Goncalvesdan', '60259', 0, '2022-02-21 07:42:26', '', NULL),
(159, 'eveniet omnis nostrum', 'Libero fugiat sit nisi consequuntur ipsum expedita. Magni et eum quisquam non. Quasi ut nisi optio iste id.', 164, 8, 10, 11, 865185, 1, 'Thierry', '95, rue de Boulanger\n53 485 Joubert-sur-Mer', '29 939', 0, '2022-02-21 07:42:26', '', NULL),
(160, 'amet molestiae similique', 'Ipsum voluptatem harum earum soluta mollitia. Laudantium atque delectus quos amet hic aut illum id. Qui et nostrum quia ut.', 87, 7, 9, 10, 380464, 1, 'CharpentierBourg', 'chemin Laporte\n11 586 Payetdan', '08087', 0, '2022-02-21 07:42:26', '', NULL),
(161, 'doloremque enim adipisci', 'A est voluptas labore suscipit cumque eum. Totam tempore eum quisquam laudantium aspernatur. Maxime nostrum qui quidem suscipit reprehenderit consequuntur et aspernatur.', 85, 4, 3, 8, 661901, 0, 'Ollivierboeuf', '69, impasse Jules Ferreira\n45 129 Maury', '82246', 0, '2022-02-21 07:42:26', '', NULL),
(162, 'sint pariatur ut', 'Sit perferendis illo sunt ipsa iure modi. Cupiditate et harum eum at modi voluptatem. Et velit nulla explicabo consectetur dolorem est vel nulla.', 234, 5, 5, 5, 698280, 1, 'BernardBourg', 'boulevard Blin\n94324 LenoirVille', '23361', 0, '2022-02-21 07:42:26', '', NULL),
(163, 'consequatur ratione tenetur', 'Esse et libero et maiores. Corporis aut recusandae placeat aut. Eum laboriosam sed recusandae quo vel rerum.', 215, 7, 5, 1, 997226, 1, 'MeyerVille', 'avenue de Delorme\n31 523 Dubois', '48 968', 0, '2022-02-21 07:42:26', '', NULL),
(164, 'aliquid eum aut', 'Nulla laboriosam aliquam eaque et nisi vel. Voluptates quaerat optio ex quo sed. Voluptate hic cumque sed libero animi quaerat corrupti cupiditate.', 235, 8, 7, 2, 387098, 0, 'Paul', 'avenue Véronique Mahe\n73 638 Nguyen', '11 231', 0, '2022-02-21 07:42:26', '', NULL),
(165, 'ea delectus et', 'Aspernatur nihil dolorum et. Rerum magnam sit quaerat quidem aut est. Et tempore nihil ut est et natus aspernatur minima.', 259, 9, 9, 12, 928550, 1, 'Langlois', '779, rue Grégoire Normand\n69387 Richard-sur-Mer', '47762', 0, '2022-02-21 07:42:26', '', NULL),
(166, 'placeat beatae doloribus', 'Molestias iste totam deserunt recusandae. Officia omnis id sapiente. Voluptates amet soluta unde officiis autem nemo.', 298, 5, 8, 6, 498544, 1, 'Renaultnec', '83, rue de De Oliveira\n67247 LeclercqBourg', '67 924', 0, '2022-02-21 07:42:26', '', NULL),
(167, 'vero velit dolor', 'Ducimus et eos est voluptas. Maiores laborum ratione sunt rerum ea perferendis. Provident recusandae ea nulla adipisci quia distinctio.', 138, 7, 8, 2, 408556, 0, 'Lebrun', '887, place de Neveu\n22648 Guillounec', '85 500', 0, '2022-02-21 07:42:26', '', NULL),
(168, 'reiciendis quasi rerum', 'Qui aperiam alias adipisci necessitatibus ullam. Ducimus cum ipsum porro odio voluptas. Aut perspiciatis molestiae quasi.', 59, 4, 3, 5, 349348, 1, 'RaymondVille', '17, chemin Pauline Berthelot\n60 124 PereiraBourg', '71463', 0, '2022-02-21 07:42:26', '', NULL),
(169, 'doloremque nostrum debitis', 'Reiciendis iure odit est incidunt. Nobis ullam dicta maxime consequuntur repellat. Ut cumque hic omnis.', 144, 6, 4, 11, 780362, 0, 'Courtois', '95, rue de Mathieu\n82 307 Lamy', '42362', 0, '2022-02-21 07:42:26', '', NULL),
(170, 'qui accusantium qui', 'Et quam et dolore ipsa. Ut soluta est eius voluptas similique modi fugit. Voluptatem at qui officia architecto aut.', 42, 8, 4, 12, 838298, 0, 'Chauveau-sur-Klein', '20, chemin de Garnier\n83 494 Chartier', '88189', 0, '2022-02-21 07:42:26', '', NULL),
(171, 'asperiores deleniti dolorem', 'Harum repellat praesentium voluptas necessitatibus quia ut. Fuga excepturi ut quia non occaecati. Voluptatem quo dolorem sint a perferendis vero.', 66, 10, 2, 1, 712766, 1, 'Meunier-la-Forêt', '840, avenue de Mathieu\n05980 Morindan', '85290', 0, '2022-02-21 07:42:26', '', NULL),
(172, 'autem molestiae ut', 'Accusantium nemo qui dolore consectetur autem est. Fugiat dolores exercitationem voluptate at quibusdam. Amet tempore saepe fugit repudiandae sit possimus ex.', 242, 6, 6, 11, 570027, 0, 'Labbenec', '93, avenue Hélène Normand\n10 387 Massenec', '64778', 0, '2022-02-21 07:42:26', '', NULL),
(173, 'dolores eveniet eum', 'Laudantium sequi vel sed repellat quam ex non. Molestiae quam et pariatur et rerum et. Rerum dolorem consequuntur nobis corporis veritatis rerum.', 90, 10, 3, 15, 727392, 0, 'Leblanc-les-Bains', '868, impasse de Roger\n72671 Legros', '07 489', 0, '2022-02-21 07:42:26', '', NULL),
(174, 'non vero consequatur', 'Nisi nulla incidunt et. Est dolorem sunt sed animi nam. Inventore ad adipisci numquam repudiandae.', 35, 8, 8, 1, 529896, 0, 'Blanchard-les-Bains', '41, boulevard Alain Reynaud\n02 373 Cohen-sur-Valentin', '49495', 0, '2022-02-21 07:42:26', '', NULL),
(175, 'aliquam animi veritatis', 'Iste voluptatem laudantium aut quia. Autem at quia ut ut rem neque. Veniam atque sint quaerat sit nesciunt quia quas.', 158, 8, 10, 12, 594920, 0, 'Maurice-sur-Boutin', '33, place Colette Guichard\n73567 Thomas', '71 813', 0, '2022-02-21 07:42:26', '', NULL),
(176, 'numquam iste enim', 'Repellendus id a nihil et nulla. Et quia sed illo consequuntur ducimus vitae. Nobis perferendis et laudantium reprehenderit ut sit laborum.', 248, 8, 4, 10, 361620, 1, 'Brun', '915, chemin Georges Thomas\n76745 Fischer', '76462', 0, '2022-02-21 07:42:26', '', NULL),
(177, 'ipsam sed tempore', 'Optio incidunt qui corporis natus aut est. Excepturi nobis iste et mollitia qui sunt omnis. Enim facere quos cumque voluptatibus rem.', 96, 9, 8, 2, 196752, 0, 'BriandVille', '87, place Bruneau\n98979 Imbert', '17101', 0, '2022-02-21 07:42:26', '', NULL),
(178, 'velit sed perspiciatis', 'Enim quo rerum delectus est tempore voluptatem et. Delectus dolor quasi repellat quibusdam. Cum repellat qui nihil et.', 148, 7, 7, 5, 704857, 1, 'Chretien-sur-Mer', '37, avenue de Dijoux\n57 035 Charpentier-les-Bains', '61027', 0, '2022-02-21 07:42:26', '', NULL),
(179, 'ut iste et', 'Soluta dolorum similique dignissimos est praesentium. Officiis molestias commodi cupiditate esse. Delectus quia est voluptatem dignissimos non provident ut.', 89, 10, 9, 7, 121756, 1, 'Gomes', '31, place Jérôme Philippe\n70 448 Seguin-sur-Hubert', '30279', 0, '2022-02-21 07:42:26', '', NULL),
(180, 'repellendus et eos', 'Et laborum temporibus unde. Expedita optio beatae qui libero eum ipsam aut. Distinctio impedit inventore fugit.', 228, 6, 3, 15, 769915, 0, 'Evrard', '90, place Leconte\n23033 Klein-la-Forêt', '26 659', 0, '2022-02-21 07:42:26', '', NULL),
(181, 'et qui aliquam', 'Quidem aliquid possimus inventore non mollitia molestiae. Voluptatem est molestiae quia assumenda voluptatem sed explicabo cupiditate. Cumque dolores in cumque est sed tempora occaecati.', 230, 8, 2, 11, 587068, 0, 'Joseph', 'boulevard Jules Dubois\n88326 Sauvage-la-Forêt', '87 882', 0, '2022-02-21 07:42:26', '', NULL),
(182, 'explicabo numquam dicta', 'Dolore iste quia commodi quo sint ipsam. Architecto quia fugiat maxime ea. Non qui adipisci sint omnis tempore est.', 311, 6, 3, 1, 440635, 0, 'Allard', '28, rue Susan Germain\n22640 Rodrigueznec', '37503', 0, '2022-02-21 07:42:26', '', NULL),
(183, 'dolore non consequatur', 'In recusandae quas sit cupiditate et repellat. Maiores rerum error nisi nulla. Mollitia qui sequi ut soluta.', 202, 10, 2, 3, 705100, 0, 'Samson', '42, rue de Sauvage\n40403 Breton-sur-Martin', '09 579', 0, '2022-02-21 07:42:26', '', NULL),
(184, 'doloribus similique quam', 'Voluptatibus cumque veritatis quia deleniti molestiae quos reprehenderit. Et quis ullam et quasi fuga. Rem deserunt non labore veniam accusantium ut.', 206, 3, 9, 15, 408257, 0, 'Navarro', '5, avenue Aubert\n48 517 Delahayenec', '15 200', 0, '2022-02-21 07:42:26', '', NULL),
(185, 'eveniet impedit voluptas', 'Corporis recusandae deserunt expedita quod magni saepe et aut. Inventore pariatur sunt aut omnis soluta tempore debitis. Qui illum assumenda autem sed reprehenderit repudiandae.', 294, 7, 10, 13, 684035, 1, 'Jacob', '29, avenue Labbe\n13828 Daniel', '17 738', 0, '2022-02-21 07:42:26', '', NULL),
(186, 'accusantium aspernatur est', 'Nam aut alias provident praesentium beatae laudantium. Architecto quaerat ea eum harum commodi. Vel animi temporibus facilis necessitatibus.', 86, 8, 8, 3, 421407, 1, 'Courtois', '99, rue Carre\n39 370 Robert', '35289', 0, '2022-02-21 07:42:26', '', NULL),
(187, 'nihil odit beatae', 'Sint qui id dolor quia. Similique dolor alias sequi voluptatem quia. Quisquam ut voluptas dicta voluptas libero adipisci laudantium.', 163, 7, 7, 1, 421718, 0, 'Pierre', '89, avenue Da Costa\n33010 Vasseur', '43940', 0, '2022-02-21 07:42:26', '', NULL),
(188, 'repellat cumque quisquam', 'Expedita dolores architecto quibusdam alias est nobis. Maxime minus eum at sint. Nostrum voluptatum et ut nobis quod quo.', 248, 8, 7, 1, 601229, 0, 'Guillaume', 'boulevard Morin\n06423 Sauvageboeuf', '71 143', 0, '2022-02-21 07:42:26', '', NULL),
(189, 'molestiae velit non', 'Quaerat incidunt deserunt velit voluptate. Consequatur quia non est eos consequatur odit. Facere voluptas itaque rerum amet asperiores.', 193, 10, 4, 1, 109211, 1, 'Lefebvre-la-Forêt', '5, rue de Hoarau\n80 848 Fischer', '19407', 0, '2022-02-21 07:42:26', '', NULL),
(190, 'qui dolorum sapiente', 'Accusantium optio sint minima. Culpa voluptatem laudantium dolores facere soluta deserunt repellat. Sed nihil maiores omnis nemo debitis dolorum.', 92, 4, 8, 6, 939397, 1, 'Perez', '85, rue Juliette Torres\n67 168 Carpentier-sur-Mer', '24 402', 0, '2022-02-21 07:42:26', '', NULL),
(191, 'sit ex deleniti', 'Voluptate necessitatibus ut ut exercitationem. Reprehenderit et esse consequuntur eos quos est eum. Aliquam eius necessitatibus velit animi illo molestiae minima sed.', 272, 10, 3, 1, 621062, 1, 'Lelievre', 'chemin de Lenoir\n82426 Garcia', '78 229', 0, '2022-02-21 07:42:26', '', NULL),
(192, 'impedit id quidem', 'Sit quia et autem sed quia. Mollitia beatae nostrum eum harum sit quibusdam. Autem dolores consequatur sint et.', 81, 7, 9, 2, 406348, 1, 'Rodriguezdan', '95, place Lefevre\n34460 Begueboeuf', '15868', 0, '2022-02-21 07:42:26', '', NULL),
(193, 'ex laudantium vel', 'Sint fuga aliquam alias repudiandae id corporis. In dolores consequatur rerum quisquam. Ut aut recusandae ut quasi maxime voluptas non.', 73, 2, 9, 14, 402017, 1, 'Clement', '64, avenue Astrid Valette\n13 602 LacombeBourg', '36 034', 0, '2022-02-21 07:42:26', '', NULL),
(194, 'et consectetur assumenda', 'Qui optio repudiandae non est similique veniam. Repellat dignissimos delectus libero est. Ad eius cum veritatis sequi odio.', 229, 10, 7, 10, 376507, 1, 'Riou', '404, avenue Juliette Duhamel\n06 731 Auger', '93 655', 0, '2022-02-21 07:42:26', '', NULL),
(195, 'asperiores molestias rem', 'Facilis vel ullam magnam. Quia voluptatem voluptatum nihil voluptatum ut. Eos consequatur rerum error at aut porro quam.', 230, 5, 8, 1, 578898, 0, 'Guyot', '83, chemin de Delattre\n54515 Dupuis', '50442', 0, '2022-02-21 07:42:26', '', NULL),
(196, 'perferendis aut sit', 'Animi eaque voluptatibus sapiente placeat non maxime aut exercitationem. Sed error quia quibusdam facere voluptate occaecati. Enim numquam ipsa quod quibusdam sit.', 238, 7, 10, 13, 785919, 1, 'Poulaindan', '11, avenue de Coste\n52199 Lacroix', '97507', 0, '2022-02-21 07:42:26', '', NULL),
(197, 'non vero natus', 'Explicabo aliquam quia cupiditate quae dignissimos qui. Aut non et est accusamus. Ipsa rem praesentium amet quis.', 256, 9, 5, 15, 896414, 1, 'Alves-sur-Pierre', '648, rue Barbe\n02217 ChevalierBourg', '72 553', 0, '2022-02-21 07:42:26', '', NULL),
(198, 'dolor repudiandae esse', 'In porro ad et ipsa ea ea. Et laboriosam commodi qui. Ex doloribus non rerum optio voluptatem.', 126, 2, 4, 9, 460480, 0, 'Ribeiro', '3, rue de Gautier\n49 564 Mace-sur-Bousquet', '57 590', 0, '2022-02-21 07:42:26', '', NULL),
(199, 'architecto et et', 'Culpa aut voluptas nemo in voluptatem id. Cumque adipisci quibusdam dolorem quasi. Est qui beatae et eum magni culpa tempore.', 96, 8, 2, 8, 810328, 1, 'GuichardBourg', '281, boulevard Lambert\n97046 Dumont', '55 759', 0, '2022-02-21 07:42:26', '', NULL),
(200, 'enim atque sit', 'Temporibus quia consequatur temporibus ducimus. Consequatur atque est et error laboriosam. Animi quo illum et numquam.', 23, 3, 10, 2, 532365, 1, 'Teixeira', 'rue Margot Begue54 637 Collin', '61823', 0, '2022-02-21 07:42:26', '6290db29270ef479506552.JPG', '2022-05-27 14:07:36'),
(201, 'numquam voluptatem ut', 'Mollitia voluptatem voluptatem qui. Consectetur id quam iste sit in. Vel est nam perspiciatis cupiditate et neque.', 223, 2, 5, 10, 129903, 1, 'Leclercq-la-Forêt', '66, chemin de Couturier35 941 Gaillardboeuf', '47683', 0, '2022-02-21 07:42:26', '6290dbfb5a832355597256.jpg', '2022-05-27 14:11:07');

-- --------------------------------------------------------

--
-- Table structure for table `property_option`
--

CREATE TABLE `property_option` (
  `property_id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `property_option`
--

INSERT INTO `property_option` (`property_id`, `option_id`) VALUES
(108, 2),
(109, 3),
(110, 2),
(110, 3),
(114, 1),
(114, 2),
(114, 3);

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
(3, 'demo', '[]', '$2y$13$qGRw4rswTVjAJ6zs7fnKMerhtPZIL56tSz7j5FG.eByWgGewtmrBy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
