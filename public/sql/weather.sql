-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- 主機: localhost
-- 產生時間： 2016 年 12 月 04 日 13:02
-- 伺服器版本: 10.1.18-MariaDB
-- PHP 版本： 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `agrodb`
--

-- --------------------------------------------------------

--
-- 資料表結構 `weather`
--

CREATE TABLE `weather` (
  `id` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `city_sn` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `town_sn` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `town` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lat` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lon` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `elev` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wdir` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wdsd` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `temp` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `humd` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pres` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sun` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `h_24r` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ws15m` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `wd15m` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ws15t` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `obsTime` varchar(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updated_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
