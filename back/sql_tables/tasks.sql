CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    author_id VARCHAR(36),
    status BOOLEAN DEFAULT FALSE,
    name VARCHAR(100),
    description TEXT,
    date DATE,
    type ENUM('tasks', 'courses', 'rdvs', 'events', 'projets'),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;