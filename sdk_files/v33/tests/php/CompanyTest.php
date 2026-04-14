<?php
// Auto-generated — do not edit
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use MediaVizSdk\Company;

require_once __DIR__ . '/helpers.php';

class CompanyTest extends TestCase {
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

}
