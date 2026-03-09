-- Migration: Adiciona campo chatId à tabela mastra_messages
ALTER TABLE mastra_messages ADD COLUMN chatId UUID;
-- Opcional: Adiciona índice para performance
CREATE INDEX idx_mastra_messages_chatId ON mastra_messages(chatId);