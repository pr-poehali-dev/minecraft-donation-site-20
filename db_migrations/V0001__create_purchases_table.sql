CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(255) NOT NULL,
    privilege VARCHAR(50) NOT NULL,
    price VARCHAR(20) NOT NULL,
    payment_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,
    error_message TEXT
);

CREATE INDEX idx_purchases_nickname ON purchases(nickname);
CREATE INDEX idx_purchases_payment_id ON purchases(payment_id);
CREATE INDEX idx_purchases_status ON purchases(status);