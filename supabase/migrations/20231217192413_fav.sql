CREATE FUNCTION favorite(memo_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE memo
    SET favorite = favorite + 1
    WHERE id = memo_id;
END;
$$ LANGUAGE plpgsql;