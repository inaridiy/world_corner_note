CREATE EXTENSION vector WITH SCHEMA extensions;

CREATE TABLE memo (
    id UUID PRIMARY KEY,
    memo TEXT NOT NULL,
    favorite INTEGER NOT NULL,
    embedding VECTOR(1536),
    created_at TIMESTAMPTZ NOT NULL
);

CREATE FUNCTION search_memo(
    query_embedding VECTOR(1536),
    match_threshold FLOAT,
    max_limit INTEGER
)
RETURNS TABLE (
    id UUID,
    memo TEXT,
    favorite INTEGER,
    embedding VECTOR(1536),
    created_at TIMESTAMPTZ,
    similarity FLOAT
) AS $$
BEGIN
    RETURN QUERY SELECT
        id,
        memo,
        favorite,
        embedding,
        created_at,
        1 - embedding <=> query_embedding AS similarity
    FROM
        memo
    WHERE
        1 - embedding <=> query_embedding < match_threshold
    ORDER BY 
        similarity
    LIMIT 
        max_limit;
END;
$$ LANGUAGE plpgsql;