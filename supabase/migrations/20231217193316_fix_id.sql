CREATE OR REPLACE FUNCTION search_memo(
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
        memo.id,
        memo.memo,
        memo.favorite,
        memo.embedding,
        memo.created_at,
        1 - memo.embedding <=> query_embedding AS similarity
    FROM
        memo
    WHERE
        1 - memo.embedding <=> query_embedding < match_threshold
    ORDER BY 
        similarity
    LIMIT 
        max_limit;
END;
$$ LANGUAGE plpgsql;