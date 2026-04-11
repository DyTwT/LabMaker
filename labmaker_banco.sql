-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 11/04/2026 às 20:11
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `labmaker_banco`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `administrador`
--

CREATE TABLE `administrador` (
  `id_administrador` int(11) NOT NULL,
  `email_administrador` varchar(100) NOT NULL,
  `senha_administrador` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `administrador`
--

INSERT INTO `administrador` (`id_administrador`, `email_administrador`, `senha_administrador`) VALUES
(1, 'admlabmaker@gmail.com', 'admlabmaker123');

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamentos`
--

CREATE TABLE `agendamentos` (
  `id` int(11) NOT NULL,
  `nome_agendamentos` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `pessoas` int(11) NOT NULL,
  `data_agendamentos` date NOT NULL,
  `horario_agendamentos` time NOT NULL,
  `status` varchar(20) NOT NULL,
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamentos`
--

INSERT INTO `agendamentos` (`id`, `nome_agendamentos`, `telefone`, `pessoas`, `data_agendamentos`, `horario_agendamentos`, `status`, `criado_em`) VALUES
(1, 'Andressa', '75999926966', 6, '2026-04-10', '14:00:00', 'Recebido', '2026-04-06 09:18:20'),
(3, 'Andressa de Pinho Barreto ', '75999926966', 3, '2026-04-09', '12:00:00', 'Recebido', '2026-04-09 21:08:08'),
(4, 'Andressa de Pinho Barreto ', '75999926966', 3, '2026-04-09', '12:00:00', 'Recebido', '2026-04-09 21:08:16'),
(5, 'Andressa de Pinho Barreto ', '75 99992 6966', 2, '2026-04-06', '14:00:00', 'Recebido', '2026-04-09 22:31:54'),
(8, 'Kauã', '1123456789', 3, '2026-04-10', '12:00:00', 'Recebido', '2026-04-10 22:47:43');

-- --------------------------------------------------------

--
-- Estrutura para tabela `slots`
--

CREATE TABLE `slots` (
  `id_slots` int(11) NOT NULL,
  `data_slots` date NOT NULL,
  `horario` time NOT NULL,
  `disponivel` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `slots`
--

INSERT INTO `slots` (`id_slots`, `data_slots`, `horario`, `disponivel`) VALUES
(6, '2026-04-06', '14:00:00', 0),
(7, '2026-04-09', '12:00:00', 0),
(8, '2026-04-10', '12:00:00', 0),
(10, '2026-04-10', '15:00:00', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `solicitacoes`
--

CREATE TABLE `solicitacoes` (
  `id_solicitacoes` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `descricao` text NOT NULL,
  `anexo` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Recebido',
  `criado_em` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `solicitacoes`
--

INSERT INTO `solicitacoes` (`id_solicitacoes`, `nome`, `telefone`, `descricao`, `anexo`, `status`, `criado_em`) VALUES
(1, 'notebbok 3d', '75999926966', 'criar um protótipo de notebook gamer 3d', NULL, 'Fazendo', '2026-04-06 14:24:40'),
(2, 'teclado gamer rgb', '75999926966', 'criação de um teclado gamer rgb com sistema de troca de cores', NULL, 'Análise', '2026-04-06 14:55:36'),
(3, 'teclado gamer rgb', '75999926966', 'criação de um teclado gamer rgb com sistema de troca de cores', NULL, 'Recebido', '2026-04-06 14:57:03'),
(4, 'mouse', '75999926966', 'mouse rgb branco', NULL, 'Concluído', '2026-04-08 10:22:58'),
(5, 'Andressa de Pinho Barreto', '75 99992 6966', 'criar um sistema de biblioteca onine', '69d995f014752.png', 'Recebido', '2026-04-10 21:29:36');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuarios` int(11) NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id_usuarios`, `nome_completo`, `email`, `telefone`, `senha`) VALUES
(1, 'Andressa de Pinho Barreto', 'andressa@gmail.com', '75999926966', 'andressa123'),
(2, 'kaua', 'kaua@gmail.com', '1234567891', 'kaua123');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_administrador`),
  ADD UNIQUE KEY `email_administrador` (`email_administrador`);

--
-- Índices de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `slots`
--
ALTER TABLE `slots`
  ADD PRIMARY KEY (`id_slots`);

--
-- Índices de tabela `solicitacoes`
--
ALTER TABLE `solicitacoes`
  ADD PRIMARY KEY (`id_solicitacoes`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuarios`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `agendamentos`
--
ALTER TABLE `agendamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `slots`
--
ALTER TABLE `slots`
  MODIFY `id_slots` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `solicitacoes`
--
ALTER TABLE `solicitacoes`
  MODIFY `id_solicitacoes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
