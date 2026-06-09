<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Company;

require_once __DIR__ . '/helpers.php';

class CompanyTest extends TestCase {
    public function test_get_admin_get_companies_exists(): void {
        $this->assertTrue(method_exists(Company::class, 'adminGetCompanies'));
    }

    public function test_get_admin_get_companies_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminGetCompanies();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_admin_get_companies_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminGetCompanies();
        $this->assertStringContainsString('/api/v1/companies/admin', $ctx->client->lastCall()['path']);
    }

    public function test_get_admin_get_companies_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminGetCompanies();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_all_companies_exists(): void {
        $this->assertTrue(method_exists(Company::class, 'getAllCompanies'));
    }

    public function test_get_get_all_companies_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->getAllCompanies();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_all_companies_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->getAllCompanies();
        $this->assertStringContainsString('/api/v1/company/', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_all_companies_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->getAllCompanies();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_get_company_by_id_exists(): void {
        $this->assertTrue(method_exists(Company::class, 'getCompanyById'));
    }

    public function test_get_get_company_by_id_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->getCompanyById(42);
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_get_company_by_id_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->getCompanyById(42);
        $this->assertStringContainsString('/api/v1/company/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_get_company_by_id_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->getCompanyById(42);
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_confirm_company_credit_balance_exists(): void {
        $this->assertTrue(method_exists(Company::class, 'confirmCompanyCreditBalance'));
    }

    public function test_get_confirm_company_credit_balance_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->confirmCompanyCreditBalance(42, 42, 'test_value');
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_confirm_company_credit_balance_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->confirmCompanyCreditBalance(42, 42, 'test_value');
        $this->assertStringContainsString('/api/v1/company/credit_balance/42', $ctx->client->lastCall()['path']);
    }

    public function test_get_confirm_company_credit_balance_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->confirmCompanyCreditBalance(42, 42, 'test_value');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('photo_count=', $path);
        $this->assertStringContainsString('models_list=', $path);
    }

    public function test_get_confirm_company_credit_balance_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->confirmCompanyCreditBalance(42, 42, 'test_value');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_get_admin_list_active_company_tokens_exists(): void {
        $this->assertTrue(method_exists(Company::class, 'adminListActiveCompanyTokens'));
    }

    public function test_get_admin_list_active_company_tokens_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminListActiveCompanyTokens();
        $this->assertSame('GET', $ctx->client->lastCall()['method']);
    }

    public function test_get_admin_list_active_company_tokens_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminListActiveCompanyTokens();
        $this->assertStringContainsString('/api/v1/company/admin_create/', $ctx->client->lastCall()['path']);
    }

    public function test_get_admin_list_active_company_tokens_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminListActiveCompanyTokens();
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_admin_create_company_token_exists(): void {
        $this->assertTrue(method_exists(Company::class, 'adminCreateCompanyToken'));
    }

    public function test_post_admin_create_company_token_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminCreateCompanyToken('user@example.com');
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_admin_create_company_token_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminCreateCompanyToken('user@example.com');
        $this->assertStringContainsString('/api/v1/company/admin_create/', $ctx->client->lastCall()['path']);
    }

    public function test_post_admin_create_company_token_query_params(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminCreateCompanyToken('user@example.com');
        $path = $ctx->client->lastCall()['path'];
        $this->assertStringContainsString('email=', $path);
    }

    public function test_post_admin_create_company_token_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminCreateCompanyToken('user@example.com');
        $this->assertCount(1, $ctx->client->calls);
    }

    public function test_post_admin_revoke_company_token_exists(): void {
        $this->assertTrue(method_exists(Company::class, 'adminRevokeCompanyToken'));
    }

    public function test_post_admin_revoke_company_token_http_method(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminRevokeCompanyToken(42);
        $this->assertSame('POST', $ctx->client->lastCall()['method']);
    }

    public function test_post_admin_revoke_company_token_path(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminRevokeCompanyToken(42);
        $this->assertStringContainsString('/api/v1/company/admin_create/42/revoke/', $ctx->client->lastCall()['path']);
    }

    public function test_post_admin_revoke_company_token_auth_routing(): void {
        $ctx = new \OAuthSdk\SpyAuthContext();
        $obj = new Company($ctx);
        $obj->adminRevokeCompanyToken(42);
        $this->assertCount(1, $ctx->client->calls);
    }

}
