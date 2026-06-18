<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Search {
    private object $ctx;

    public function __construct(object $ctx) {
        $this->ctx = $ctx;
    }

    public function searchProjectPhotos(
        string $projectTableName,
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
        mixed $curatedAlbumId = null,
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
        if ($curatedAlbumId !== null) $query['curated_album_id'] = $curatedAlbumId;
        if ($splitByTier !== null) $query['split_by_tier'] = $splitByTier;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function searchProjectPhotosParametrized(
        string $projectTableName,
        mixed $andSearchText = null,
        mixed $orSearchText = null,
        mixed $notSearchText = null,
        mixed $city = null,
        mixed $country = null,
        mixed $state = null,
        mixed $albums = null,
        mixed $dateMin = null,
        mixed $dateMax = null,
        mixed $dateNullAnd = null,
        mixed $dateNullOr = null,
        mixed $dateOrder = null,
        mixed $bestOfSimilarSetsOnly = null,
        mixed $splitByTier = null,
        ?int $size = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/search/parametrized/" . rawurlencode((string)$projectTableName) . "/";
        $query = [];
        if ($andSearchText !== null) $query['and_search_text'] = $andSearchText;
        if ($orSearchText !== null) $query['or_search_text'] = $orSearchText;
        if ($notSearchText !== null) $query['not_search_text'] = $notSearchText;
        if ($city !== null) $query['city'] = $city;
        if ($country !== null) $query['country'] = $country;
        if ($state !== null) $query['state'] = $state;
        if ($albums !== null) $query['albums'] = $albums;
        if ($dateMin !== null) $query['date_min'] = $dateMin;
        if ($dateMax !== null) $query['date_max'] = $dateMax;
        if ($dateNullAnd !== null) $query['date_null_and'] = $dateNullAnd;
        if ($dateNullOr !== null) $query['date_null_or'] = $dateNullOr;
        if ($dateOrder !== null) $query['date_order'] = $dateOrder;
        if ($bestOfSimilarSetsOnly !== null) $query['best_of_similar_sets_only'] = $bestOfSimilarSetsOnly;
        if ($splitByTier !== null) $query['split_by_tier'] = $splitByTier;
        if ($size !== null) $query['size'] = $size;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function searchProjectPhotosNaturalLanguage(
        string $projectTableName,
        string $searchText,
        ?int $size = null,
        ?float $minCosine = null,
        ?float $labelMinCosine = null,
        ?int $labelTopK = null,
        ?float $labelDelta = null,
        mixed $bestOfSimilarSetsOnly = null,
        mixed $splitByTier = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/search/natural_language/" . rawurlencode((string)$projectTableName) . "/";
        $query = [];
        if ($minCosine !== null) $query['min_cosine'] = $minCosine;
        if ($labelMinCosine !== null) $query['label_min_cosine'] = $labelMinCosine;
        if ($labelTopK !== null) $query['label_top_k'] = $labelTopK;
        if ($labelDelta !== null) $query['label_delta'] = $labelDelta;
        if ($bestOfSimilarSetsOnly !== null) $query['best_of_similar_sets_only'] = $bestOfSimilarSetsOnly;
        if ($splitByTier !== null) $query['split_by_tier'] = $splitByTier;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        $body = array_filter([
            'search_text' => $searchText,
            'size' => $size,
        ], fn($v) => $v !== null);
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken, $body)->data;
    }

    public function getProjectSavedSearches(string $projectTableName): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/search/saved/" . rawurlencode((string)$projectTableName) . "/";
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function getSavedSearchById(int $searchId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/search/" . rawurlencode((string)$searchId);
        return $this->ctx->client->request($path, 'GET', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function saveProjectPhotosSearch(
        string $projectTableName,
        ?string $searchName = null,
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
        mixed $curatedAlbumId = null,
        mixed $splitByTier = null
    ): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/search/" . rawurlencode((string)$projectTableName) . "/";
        $query = [];
        if ($searchName !== null) $query['search_name'] = $searchName;
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
        if ($curatedAlbumId !== null) $query['curated_album_id'] = $curatedAlbumId;
        if ($splitByTier !== null) $query['split_by_tier'] = $splitByTier;
        if ($query) {
            $pairs = [];
            foreach ($query as $k => $v) {
                foreach ((is_array($v) ? $v : [$v]) as $vv) $pairs[] = rawurlencode($k) . '=' . rawurlencode((string)$vv);
            }
            $path .= '?' . implode('&', $pairs);
        }
        return $this->ctx->client->request($path, 'POST', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }

    public function deleteSavedSearchById(int $searchId): mixed {
        $this->ctx->requireTokens();
        $path = "/api/v1/search/" . rawurlencode((string)$searchId);
        return $this->ctx->client->request($path, 'DELETE', $this->ctx->accessToken, $this->ctx->refreshToken)->data;
    }
}
