<?php
declare(strict_types=1);
namespace MediaVizSdk;

class Search {
    private \OAuthSdk\OAuthClient $client;

    public function __construct(\OAuthSdk\OAuthClient $client) {
        $this->client = $client;
    }

    public function getSearch(
        string $accessToken,
        string $refreshToken,
        string $projectTableName,
        ?mixed $andParams = null,
        ?mixed $orParams = null,
        ?bool $dateNullAnd = null,
        ?mixed $dateMin = null,
        ?mixed $dateMax = null,
        ?int $customAlbumId = null,
        ?string $curatedAlbumName = null,
        ?mixed $dateOrder = null,
        ?bool $bestOfSimilarSetsOnly = null
    ): \OAuthSdk\AuthenticatedResponse {
        $path = "/api/v1/search/" . urlencode($projectTableName) . "/";
        $query = [];
        if ($andParams !== null) $query['and_params'] = $andParams;
        if ($orParams !== null) $query['or_params'] = $orParams;
        if ($dateNullAnd !== null) $query['date_null_and'] = $dateNullAnd;
        if ($dateMin !== null) $query['date_min'] = $dateMin;
        if ($dateMax !== null) $query['date_max'] = $dateMax;
        if ($customAlbumId !== null) $query['custom_album_id'] = $customAlbumId;
        if ($curatedAlbumName !== null) $query['curated_album_name'] = $curatedAlbumName;
        if ($dateOrder !== null) $query['date_order'] = $dateOrder;
        if ($bestOfSimilarSetsOnly !== null) $query['best_of_similar_sets_only'] = $bestOfSimilarSetsOnly;
        if ($query) $path .= '?' . http_build_query($query);
        return $this->client->request($path, 'GET', $accessToken, $refreshToken);
    }
}
