<?php

declare(strict_types=1);

namespace OAuthSdk;

enum OAuthErrorCode: string
{
    case INVALID_REQUEST = 'invalid_request';
    case INVALID_CLIENT = 'invalid_client';
    case INVALID_GRANT = 'invalid_grant';
    case UNAUTHORIZED_CLIENT = 'unauthorized_client';
    case UNSUPPORTED_GRANT_TYPE = 'unsupported_grant_type';
    case ACCESS_DENIED = 'access_denied';
    case SERVER_ERROR = 'server_error';
}
