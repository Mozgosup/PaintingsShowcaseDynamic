ALTER TABLE painting
    ADD COLUMN slug VARCHAR(255);

WITH preferred AS (SELECT DISTINCT ON (pt.painting_id) pt.painting_id,
                                                       pt.name
                   FROM painting_translation pt
                   ORDER BY pt.painting_id,
                            CASE
                                WHEN pt.language IN ('en') THEN 1
                                WHEN pt.language = 'ru' THEN 2
                                ELSE 3
                                END,
                            pt.id)

UPDATE painting p
SET slug = lower(
        trim(both '-' from
             regexp_replace(
                     pr.name,
                     '[^a-zA-Z0-9]+',
                     '-',
                     'g'
             )
        )
           )
FROM preferred pr
WHERE pr.painting_id = p.id;

UPDATE painting p
SET slug = CASE
               WHEN p.slug IS NULL OR p.slug = ''
                   THEN 'p-' || p.id
               ELSE
                   left(p.slug, 255 - 1 - length(p.id::text)) || '-' || p.id
    END;

ALTER TABLE painting
    ALTER COLUMN slug SET NOT NULL;

CREATE UNIQUE INDEX ux_painting_slug ON painting (slug);
