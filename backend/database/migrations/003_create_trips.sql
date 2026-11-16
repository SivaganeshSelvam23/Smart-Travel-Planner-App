CREATE TABLE  trips(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    owner_id BIGINT NOT NULL REFERENCES users(id),
    
    title VARCHAR(150) NOT NULL,
    
    destination VARCHAR(200) NOT NULL,
    
    start_date DATE NOT NULL,
    
    end_date DATE NOT NULL,
    
    status VARCHAR(20) NOT NULL DEFAULT 'planning',
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT trips_valid_dates
        CHECK(end_date >= start_date),
    
    CONSTRAINT trips_valid_status
        CHECK(status IN('planning', 'confirmed', 'completed', 'cancelled'))
);