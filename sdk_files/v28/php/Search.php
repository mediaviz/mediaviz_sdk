<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Search {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function searchProjectPhotos(
        mixed $projectTableName,
        mixed $andParams = null,
        mixed $andStringParams = null,
        mixed $orParams = null,
        mixed $orStringParams = null,
        mixed $notParams = null,
        mixed $notStringParams = null,
        mixed $dateMin = null,
        mixed $dateMax = null,
        mixed $dateNullAnd = null,
        mixed $dateNullOr = null,
        mixed $dateOrder = null,
        mixed $customAlbumId = null,
        mixed $bestOfSimilarSetsOnly = null,
        mixed $curatedAlbumName = null,
        mixed $splitByTier = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/search/" . rawurlencode((string)$projectTableName) . "/";
        $query = [];
        if ($andParams !== null) $query['and_params'] = $andParams;
        if ($andStringParams !== null) $query['and_string_params'] = $andStringParams;
        if ($orParams !== null) $query['or_params'] = $orParams;
        if ($orStringParams !== null) $query['or_string_params'] = $orStringParams;
        if ($notParams !== null) $query['not_params'] = $notParams;
        if ($notStringParams !== null) $query['not_string_params'] = $notStringParams;
        if ($dateMin !== null) $query['date_min'] = $dateMin;
        if ($dateMax !== null) $query['date_max'] = $dateMax;
        if ($dateNullAnd !== null) $query['date_null_and'] = $dateNullAnd;
        if ($dateNullOr !== null) $query['date_null_or'] = $dateNullOr;
        if ($dateOrder !== null) $query['date_order'] = $dateOrder;
        if ($customAlbumId !== null) $query['custom_album_id'] = $customAlbumId;
        if ($bestOfSimilarSetsOnly !== null) $query['best_of_similar_sets_only'] = $bestOfSimilarSetsOnly;
        if ($curatedAlbumName !== null) $query['curated_album_name'] = $curatedAlbumName;
        if ($splitByTier !== null) $query['split_by_tier'] = $splitByTier;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
