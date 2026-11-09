// Auto-generated — do not edit. TypeScript declarations for the MediaViz SDK.
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface AuthorizationUrlResult {
  url: string;
  state: string;
  code_verifier: string;
}

export interface MediaVizConfig {
  clientId?: string;
  clientSecret?: string;
  baseUrl?: string;
  redirectUri?: string;
  hosts?: Record<string, string>;
  accessToken?: string;
  refreshToken?: string;
  onTokenRefresh?: (tokens: TokenResponse) => void;
}

export class OAuthClient {
  constructor(config: { baseUrl?: string; clientId?: string; clientSecret?: string; redirectUri?: string });
}

export class OAuthError extends Error {
  code: string;
}

export const OAuthErrorCode: { [key: string]: string };

export class ApiError extends Error {
  status: number;
  requestId: string | null;
  body: any;
  constructor(message: string, status: number, requestId: string | null, body: any);
}

export class ValidationError extends ApiError {
  fieldErrors: Array<{ loc: (string | number)[]; msg: string; type: string }>;
  constructor(body: any, status: number, requestId: string | null);
}

export class NotFoundError extends ApiError {
  constructor(body: any, status: number, requestId: string | null);
}

export class RateLimitError extends ApiError {
  retryAfter: number | null;
  constructor(body: any, status: number, requestId: string | null, headers: Headers);
}

export class ServerError extends ApiError {
  constructor(body: any, status: number, requestId: string | null);
}

export function handleResponse(response: Response): Promise<any>;

export type WebhookAck = 'handled' | 'duplicate' | 'bad_signature';

export interface WebhookDeliveryEvent {
  event_id: string;
  event_type: string;
  schema_version?: string;
  subscription_id: string;
  project_table_name: string;
  photo_id: number;
  target: string;
  completed_at?: string;
  result_location?: string;
  [key: string]: any;
}

export interface WebhookStoreLike {
  markSeen(eventId: string, ttlS: number): boolean;
  unmarkSeen(eventId: string): void;
  saveSecret(subscriptionId: string, secret: string): void;
  rotateSecret(subscriptionId: string, newSecret: string, windowS: number): void;
  getSecrets(subscriptionId: string): [string | null, string | null];
  getCursor(subscriptionId: string): string | null;
  setCursor(subscriptionId: string, cursor: string): void;
}

export class InMemoryWebhookStore implements WebhookStoreLike {
  markSeen(eventId: string, ttlS: number): boolean;
  unmarkSeen(eventId: string): void;
  saveSecret(subscriptionId: string, secret: string): void;
  rotateSecret(subscriptionId: string, newSecret: string, windowS: number): void;
  getSecrets(subscriptionId: string): [string | null, string | null];
  getCursor(subscriptionId: string): string | null;
  setCursor(subscriptionId: string, cursor: string): void;
}

export class WebhookConsumer {
  constructor(ctx: any, subscriptionApi: any, options?: {
    store?: WebhookStoreLike;
    onEvent?: (event: WebhookDeliveryEvent) => void | Promise<void>;
    skewToleranceS?: number;
    rotationWindowS?: number;
    dedupeTtlS?: number;
    pageLimit?: number;
  });
  store: WebhookStoreLike;
  skewToleranceS: number;
  rotationWindowS: number;
  dedupeTtlS: number;
  pageLimit: number;
  onEvent(fn: (event: WebhookDeliveryEvent) => void | Promise<void>): (event: WebhookDeliveryEvent) => void | Promise<void>;
  useStore(store: WebhookStoreLike): void;
  classifyMessage(body: any): 'verification' | 'delivery' | 'unknown';
  handleChallenge(body: any): { challenge: string };
  handleDelivery(headers: any, rawBody: string | Uint8Array | ArrayBuffer): Promise<WebhookAck>;
  handleRequest(headers: any, rawBody: string | Uint8Array | ArrayBuffer): Promise<{ status: number; body: any }>;
  register(projectTableName: string, callbackUrl: string, targets: string[]): Promise<any>;
  confirm(subscriptionId: string): Promise<any>;
  rotateSecret(subscriptionId: string): Promise<string>;
  updateCallback(subscriptionId: string, callbackUrl: string): Promise<any>;
  disable(subscriptionId: string): Promise<any>;
  listSubscriptions(): Promise<any>;
  pullEvents(subscriptionId: string, options?: { since?: string; limit?: number }): Promise<any>;
  reconcile(subscriptionId: string, projectTableName: string): Promise<{ pulled: number; dispatched: number }>;
  fetchResult(event: WebhookDeliveryEvent): Promise<{ photo: any; selected: Record<string, any> | null }>;
  saveSecret(subscriptionId: string, secret: string): void;
}

export function signWebhookPayload(secret: string, timestamp: string, rawBody: string | Uint8Array | ArrayBuffer): Promise<string>;
export function verifyWebhookSignature(secretCurrent: string | null, secretPrevious: string | null, headers: any, rawBody: string | Uint8Array | ArrayBuffer, options?: { skewToleranceS?: number; now?: number }): Promise<boolean>;
export function selectResultColumns(photo: any, target: string): Record<string, any> | null;
export const WEBHOOK_MODEL_COLUMNS: Record<string, string[]>;
export const WEBHOOK_OUTCOME_MODELS: Record<string, string[]>;

// ── response schemas ──
export interface AlbumDisplay {
  name?: any;
  description?: any;
  id: number;
  project_table_name: string;
}

export interface AnalysisStatusResponse {
  project_table_name: string;
  model_or_process: string;
  status: string;
  last_updated_at: string;
}

export interface CompanyCreationTokenDisplay {
  id: number;
  token: string;
  email: string;
  created_at: string;
  expires_at: string;
}

export interface CompanyDisplay {
  name: string;
  id: number;
  owner_id: number;
  users?: any;
  active: boolean;
  payment_plan_type: string;
}

export interface CompanyKeywordListOverview {
  id: number;
  name: string;
  active_keywords: number;
  excluded_keywords: number;
  project_ids?: any;
}

export interface CompanyOverview {
  company_id: number;
  company_name: string;
  company_owner?: any;
  company_email?: any;
  company_create_date?: any;
  last_activity?: any;
  number_of_users: number;
  number_of_collections: number;
  number_of_photos: number;
  number_of_keywords: number;
  active_keyword_list?: any;
  can_manage_api_clients?: boolean;
}

export interface CredentialSelfServiceEnablementDisplay {
  company_id: number;
  can_manage_api_clients: boolean;
}

export interface CreditBalanceOutput {
  sufficient_credits: boolean;
  current_credit_balance: number;
  credit_cost: number;
  required_credits: number;
}

export interface CuratedAlbumDisplay {
  id: number;
  project_table_name: string;
  name: string;
  description?: any;
  confidence_value?: any;
}

export interface EventPage {
  events: any;
  next_cursor?: any;
}

export interface HealthCheck {
  status?: string;
  timestamp?: string;
  checks?: any;
}

export interface KeywordListDisplayWithList {
  id: number;
  user_id: number;
  company_id: number;
  name: string;
  date_created: string;
  date_last_updated: string;
  is_inclusion?: any;
  gsheet_view_link?: any;
  gsheet_csv_link?: any;
  gsheet_xlsx_link?: any;
  list_keywords_included_or_excluded?: any;
}

export interface KeywordListDisplayWithProjects {
  id: number;
  user_id: number;
  company_id: number;
  name: string;
  date_created: string;
  date_last_updated: string;
  is_inclusion?: any;
  list_projects_associated?: any;
}

export interface OrganizationCredentialCreated {
  client_id: string;
  client_secret: string;
  credential_name: string;
  created_at: string;
}

export interface PhotoDisplay {
  photo_s3_link: string;
  client_side_id?: any;
  moment_id?: any;
  file_path?: any;
  image_metadata?: any;
  tags?: any;
  title?: any;
  description?: any;
  format?: any;
  size?: any;
  source_resolution_x?: any;
  source_resolution_y?: any;
  date_taken?: any;
  date_modified?: any;
  date_guessed?: any;
  date_uploaded?: string;
  latitude?: any;
  longitude?: any;
  country_code?: any;
  country?: any;
  state?: any;
  city?: any;
  average_hash?: any;
  perceptual_hash?: any;
  difference_hash?: any;
  wavelet_hash_haar?: any;
  color_hash?: any;
  reference_1_average_distance?: any;
  reference_2_average_distance?: any;
  reference_3_average_distance?: any;
  main_color_palette?: any;
  color_averages?: any;
  labels_from_classifications_model?: any;
  ocr_output?: any;
  bounding_boxes_from_faces_model?: any;
  number_of_faces?: any;
  blur_value?: any;
  feature_extraction_output?: any;
  similar_photo_ids_high?: any;
  similar_photo_ids_medium?: any;
  similar_photo_ids_low?: any;
  evidence_score?: any;
  face_score?: any;
  content_score?: any;
  aesthetic_score?: any;
  similarity_set_ranking?: any;
  topic?: any;
  rank?: any;
  hue_values?: any;
  light_values?: any;
  saturation_values?: any;
  aesthetic_appeal?: any;
  lighting?: any;
  subject_significance?: any;
  emotional_intensity?: any;
  positive_emotion?: any;
  universal_relatability?: any;
  memorability?: any;
  composition?: any;
  judgment_overall_score?: any;
  user_id: number;
  company_id: number;
  id: number;
  project_table_name: string;
}

export interface PhotoFace {
  smile_value?: any;
  smile_confidence?: any;
  eyeglasses_value?: any;
  eyeglasses_confidence?: any;
  sunglasses_value?: any;
  sunglasses_confidence?: any;
  eyes_open_value?: any;
  eyes_open_confidence?: any;
  emotion_happy_confidence?: any;
  emotion_sad_confidence?: any;
  landmark_eyeleft_x?: any;
  landmark_eyeleft_y?: any;
  landmark_eyeright_x?: any;
  landmark_eyeright_y?: any;
  landmark_mouthleft_x?: any;
  landmark_mouthleft_y?: any;
  landmark_mouthright_x?: any;
  landmark_mouthright_y?: any;
  landmark_nose_x?: any;
  landmark_nose_y?: any;
  pose_roll?: any;
  pose_yaw?: any;
  pose_pitch?: any;
  quality_brightness?: any;
  quality_sharpness?: any;
  face_occluded_value?: any;
  eye_direction_yaw?: any;
  eye_direction_pitch?: any;
  eye_direction_confidence?: any;
}

export interface PhotoPersonLight {
  id: number;
  person_id: string;
  bounding_box: Record<string, any>;
  confidence: number;
  person_name: string;
}

export interface PhotoPersonWithCount {
  id: number;
  person_id: string;
  bounding_box: Record<string, any>;
  confidence: number;
  person_name: string;
  number_of_photos: number;
}

export interface PhotoPersonWithS3Link {
  id: number;
  person_id: string;
  bounding_box: Record<string, any>;
  confidence: number;
  person_name: string;
  photo_s3_link: string;
  number_of_photos: number;
}

export interface ProjectRunAdminDisplay {
  name: string;
  private?: any;
  type: number;
  description?: any;
  directory?: any;
  photo_upload_vector?: any;
  thumbnail?: any;
  run_name?: any;
  id: string;
  user_id: number;
  company_id: number;
  active: boolean;
  project_table_name: string;
  date_created: string;
  number_of_photos?: any;
  date_photos_uploaded?: any;
  date_deleted?: any;
  top_tier?: any;
  tier_2?: any;
  total_photos_uploaded?: any;
  gsheet_view_link?: any;
  gsheet_csv_link?: any;
  gsheet_xlsx_link?: any;
  insights_view_link?: any;
  similarity_level?: any;
  blur_model?: any;
  colors_model?: any;
  face_recognition_model?: any;
  image_classification_model?: any;
  image_comparison_model?: any;
  image_describe_model?: any;
  ocr_model?: any;
  judgment_model?: any;
  similarity_model?: any;
  personhood_model?: any;
  evidence_model?: any;
  insights_model?: any;
  normalize?: any;
  is_continuous_upload?: any;
  files_attempted_count: number;
  failed_files_count: number;
}

export interface ProjectRunDisplay {
  name: string;
  private?: any;
  type: number;
  description?: any;
  directory?: any;
  photo_upload_vector?: any;
  thumbnail?: any;
  run_name?: any;
  id: string;
  user_id: number;
  company_id: number;
  active: boolean;
  project_table_name: string;
  date_created: string;
  number_of_photos?: any;
  date_photos_uploaded?: any;
  date_deleted?: any;
  top_tier?: any;
  tier_2?: any;
  total_photos_uploaded?: any;
  gsheet_view_link?: any;
  gsheet_csv_link?: any;
  gsheet_xlsx_link?: any;
  insights_view_link?: any;
  similarity_level?: any;
  blur_model?: any;
  colors_model?: any;
  face_recognition_model?: any;
  image_classification_model?: any;
  image_comparison_model?: any;
  image_describe_model?: any;
  ocr_model?: any;
  judgment_model?: any;
  similarity_model?: any;
  personhood_model?: any;
  evidence_model?: any;
  insights_model?: any;
  normalize?: any;
  is_continuous_upload?: any;
}

export interface SearchDisplay {
  id: number;
  project_table_name: string;
  search_name: string;
  and_params?: any;
  and_string_params?: any;
  or_params?: any;
  or_string_params?: any;
  not_params?: any;
  not_string_params?: any;
  date_min?: any;
  date_max?: any;
  date_null_and?: any;
  date_null_or?: any;
  date_order?: any;
  custom_album_id?: any;
  best_of_similar_sets_only?: any;
  curated_album_id?: any;
}

export interface SubscriptionActivated {
  subscription_id: string;
  status: string;
  signing_secret: string;
}

export interface SubscriptionDisplay {
  id: string;
  project_table_name: string;
  callback_url?: any;
  targets: any;
  status: string;
  consecutive_failures: number;
  last_delivery_at?: any;
  last_status_code?: any;
  created_at: string;
}

export interface UserDisplay {
  id: number;
  company_id: number;
  name: string;
  email: string;
  account_type: number;
  location?: any;
  phone_number?: any;
  birthday?: any;
  profile_picture?: any;
}

export interface UserDisplayForAdmin {
  name: string;
  company_name: string;
  id: number;
  company_id: number;
  email: string;
  last_login?: any;
  account_type: number;
  total_photos_uploaded: number;
}

export interface UserDisplayWithCompanyPermissions {
  id: number;
  company_id: number;
  name: string;
  email: string;
  account_type: number;
  location?: any;
  phone_number?: any;
  birthday?: any;
  profile_picture?: any;
  can_manage_api_clients?: boolean;
}

export class AiModelCredits {
  getModelCreditRelationship(modelName: string): Promise<Record<string, any>>;
  upsertModelCreditRelationship(options?: { modelName?: string | string[], newCreditValue?: number | number[] }): Promise<Record<string, any>>;
}

export class Admin {
  insertLabelCategoryMatrix(): Promise<any>;
  generateMidLevelCategoryKeywordAlignment(): Promise<any>;
  getCategoryLabels(category: string): Promise<Record<string, any>>;
  adminDumpCompanyNlpIndex(companyId: number): Promise<Record<string, any>>;
  getAllKeywordGroupsAndSubgroups(): Promise<Record<string, any>>;
  getKeywordGroupsLabelsByKeywordGroup(keywordGroup: string, options?: { subgroup?: string | string[] }): Promise<Record<string, any>>;
  adminBackfillFilePathField(): Promise<Record<string, any>>;
  adminBackfillColorFamiliesField(): Promise<Record<string, any>>;
  adminSetCompanyCanManageApiClients(companyId: number, canManageApiClients: boolean): Promise<CredentialSelfServiceEnablementDisplay>;
  adminClearNlSearchCache(): Promise<Record<string, any>>;
  adminDeleteCompanyNlpIndexes(options?: { companyIds?: any }): Promise<Record<string, any>>;
  adminDeleteUserProjects(options?: { userIds?: any }): Promise<Record<string, any>>;
  adminDeleteUser(options?: { userIds?: any }): Promise<Record<string, any>>;
}

export class Company {
  adminGetCompanies(): Promise<CompanyOverview[]>;
  getAllCompanies(): Promise<CompanyDisplay[]>;
  getCompanyById(companyId: number): Promise<CompanyDisplay>;
  confirmCompanyCreditBalance(companyId: number, options?: { photoCount?: number | number[], modelsList?: any }): Promise<CreditBalanceOutput>;
  adminListActiveCompanyTokens(): Promise<CompanyCreationTokenDisplay[]>;
  adminCreateCompanyToken(options?: { email?: string | string[] }): Promise<CompanyCreationTokenDisplay>;
  adminRevokeCompanyToken(tokenId: number): Promise<Record<string, any>>;
}

export class CuratedAlbums {
  createCuratedAlbum(projectTableName: string, name: string, description?: any, confidenceValue?: any): Promise<CuratedAlbumDisplay>;
  getAllProjectCuratedAlbums(projectTableName: string): Promise<CuratedAlbumDisplay[]>;
  getCuratedAlbumPhotos(albumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], confidenceValue?: number | number[] }): Promise<any[]>;
  getCuratedAlbumPhotosRanked(albumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], confidenceValue?: number | number[] }): Promise<Record<string, any>>;
  getCuratedAlbumById(albumId: number): Promise<CuratedAlbumDisplay>;
  updateCuratedAlbum(albumId: number, body?: { name?: any, description?: any, confidenceValue?: any }): Promise<CuratedAlbumDisplay>;
  deleteCuratedAlbum(albumId: number): Promise<Record<string, any>>;
  convertCuratedAlbumToCustom(albumId: number): Promise<CuratedAlbumDisplay>;
}

export class CustomAlbums {
  getCustomAlbumDetailById(customAlbumId: number): Promise<AlbumDisplay>;
  getAllProjectCustomAlbums(projectTableName: string): Promise<AlbumDisplay[]>;
  getCustomAlbumPhotosById(customAlbumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[] }): Promise<any>;
  getRankedCustomAlbumById(customAlbumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[] }): Promise<Record<string, any>>;
  createProjectCustomAlbum(projectTableName: string, body?: { name?: any, description?: any, photoIdInclusionList?: any, photoIdRemovalList?: any }): Promise<AlbumDisplay>;
  updateCustomAlbum(albumId: number, body?: { name?: any, description?: any, photoIdInclusionList?: any, photoIdRemovalList?: any }): Promise<AlbumDisplay>;
  deleteCustomAlbum(albumId: number): Promise<Record<string, any>>;
}

export class EmailTokens {
  requestEmailVerification(options?: { email?: string | string[] }): Promise<Record<string, any>>;
  verifyEmail(token: string): Promise<Record<string, any>>;
  requestPasswordReset(options?: { email?: string | string[] }): Promise<Record<string, any>>;
  validateToken(token: string): Promise<Record<string, any>>;
  resetPassword(token: string, newPassword: string): Promise<Record<string, any>>;
  deleteUserEmailTokens(userId: number): Promise<Record<string, any>>;
}

export class Health {
  healthCheck(): Promise<HealthCheck>;
  livenessCheck(): Promise<HealthCheck>;
  readinessCheck(): Promise<HealthCheck>;
}

export class Keywords {
  createKeywordFilteringList(name: string, projectList?: any): Promise<KeywordListDisplayWithProjects>;
  adminCreateKeywordFilteringList(name: string, companyId: number, projectList?: any): Promise<KeywordListDisplayWithProjects>;
  getUserKeywordFilteringLists(): Promise<KeywordListDisplayWithProjects[]>;
  getCompanyKeywordLists(companyId: number): Promise<CompanyKeywordListOverview[]>;
  getKeywordFilteringListAndProjectsById(keywordListId: number): Promise<KeywordListDisplayWithProjects>;
  getKeywordFilteringListById(keywordListId: number): Promise<KeywordListDisplayWithList>;
  getExistingKeywordFilteringListByProject(projectTableName: string): Promise<Record<string, any>>;
  getDefaultKeywordFilteringListByProject(projectTableName: string): Promise<Record<string, any>>;
  updateKeywordFilteringListLabels(keywordListId: number, listKeywordsToInclude: any, listKeywordsToExclude: any): Promise<KeywordListDisplayWithList>;
  updateKeywordFilteringListDetails(keywordListId: number, body?: { name?: any, projectList?: any }): Promise<KeywordListDisplayWithProjects>;
  addProjectsToKeywordFilteringList(keywordListId: number, options?: { projectIds?: any }): Promise<Record<string, any>>;
  adminAddProjectsToKeywordFilteringList(keywordListId: number, options?: { projectIds?: any }): Promise<Record<string, any>>;
  addCompanyToKeywordFilteringList(keywordListId: number, options?: { companyId?: number | number[] }): Promise<Record<string, any>>;
  adminAddCompanyToKeywordFilteringList(keywordListId: number, options?: { companyId?: number | number[] }): Promise<Record<string, any>>;
  requestKeywordListExport(keywordListId: number): Promise<Record<string, any>>;
  requestKeywordListExportStatus(keywordListId: number): Promise<AnalysisStatusResponse>;
  getKeywordsAndIds(): Promise<Record<string, any>>;
  removeProjectsFromKeywordFilteringList(keywordListId: number, options?: { projectIds?: any }): Promise<Record<string, any>>;
  adminRemoveProjectsFromKeywordFilteringList(keywordListId: number, options?: { projectIds?: any }): Promise<Record<string, any>>;
  removeCompanyFromKeywordFilteringList(keywordListId: number, options?: { companyId?: number | number[] }): Promise<Record<string, any>>;
  adminRemoveCompanyFromKeywordFilteringList(keywordListId: number, options?: { companyId?: number | number[] }): Promise<Record<string, any>>;
  adminDeleteKeywordFilteringListById(keywordListId: number): Promise<Record<string, any>>;
  deleteKeywordFilteringListById(keywordListId: number): Promise<Record<string, any>>;
}

export class OauthAuthorization {
  authorize(options?: { responseType?: string | string[], clientId?: string | string[], redirectUri?: string | string[], state?: string | string[], codeChallenge?: string | string[], codeChallengeMethod?: string | string[] }): Promise<any>;
  getConsent(sessionId: string): Promise<any>;
  postApproveConsent(sessionId: string, body: { restartUrl: string }): Promise<any>;
  postDenyConsent(sessionId: string, body: { restartUrl: string }): Promise<any>;
  getSwitchUser(sessionId: string, options?: { restartUrl?: string | string[] }): Promise<any>;
}

export class OauthClients {
  createClient(clientName: string, clientType: string, grantTypes: any, isFirstParty: boolean, redirectUris?: any, companyId?: any): Promise<Record<string, any>>;
  createApiCredential(credentialName: string): Promise<OrganizationCredentialCreated>;
  getCompanyApiCredentials(): Promise<any>;
  revokeApiCredential(clientId: string): Promise<any>;
}

export class OauthToken {
  token(body: { grantType: string, code: string, redirectUri: string, clientId: string, codeVerifier: string, refreshToken: string, clientSecret: string }): Promise<Record<string, any>>;
  adminRevokeUserTokens(userId: number): Promise<Record<string, any>>;
  revoke(body: { token: string, tokenTypeHint: string, clientId: string }): Promise<Record<string, any>>;
}

export class OauthLogin {
  getLogin(options?: { next?: string | string[] }): Promise<any>;
  postLogin(body: { email: string, password: string, next: string }): Promise<any>;
}

export class Person {
  updatePerson(projectTableName: string, personId: string, options?: { personName?: string | string[] }): Promise<any>;
  removePersonName(projectTableName: string, personId: string): Promise<PhotoPersonLight>;
  combinePersons(projectTableName: string, destinationPersonId: string, oldPersonId: string): Promise<PhotoPersonLight>;
  splitPersons(projectTableName: string, id: number, options?: { newName?: string | string[], destinationPersonId?: string | string[] }): Promise<PhotoPersonLight>;
  getAllPersonsFromProject(projectTableName: string): Promise<PhotoPersonWithS3Link[]>;
  getAllPersonNamesFromProject(projectTableName: string): Promise<any>;
  getPhotoIdsByPersons(projectTableName: string, options?: { personId?: string[] | string[][] }): Promise<any[]>;
  getAllPersonsFromPhoto(projectTableName: string, photoId: number): Promise<PhotoPersonWithCount[]>;
  removePerson(projectTableName: string, personId: string): Promise<Record<string, any>>;
}

export class Photoupload {
  uploadPhotoToMediaviz(fileContent: string, filePath: string, mimetype: string, companyId: string, userId: string, projectTableName: string, blur: boolean | string, colors: boolean | string, faceRecognition: boolean | string, imageClassification: boolean | string, imageComparison: boolean | string, imageDescribe: boolean | string, ocr: boolean | string, judgment: boolean | string, options?: { clientSideId?: string, format?: string, size?: string, sourceResolutionX?: number | string, sourceResolutionY?: number | string, dateTaken?: string, latitude?: number | string, longitude?: number | string }): Promise<any>;
  uploadPhoto(companyId: string, userId: string, projectTableName: string, photo: Record<string, any>): Promise<any>;
}

export class Photos {
  getPhotoFromProject(tableName: string, photoId: number, options?: { keywordListId?: number | number[] }): Promise<PhotoDisplay>;
  getPhotoFaceDetailsFromProject(tableName: string, photoId: number): Promise<PhotoFace[]>;
  getProjectPhotoIdsByTableName(tableName: string, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], includeAll?: boolean | boolean[], startDate?: string | string[], endDate?: string | string[], noDateTaken?: boolean | boolean[] }): Promise<any>;
  getRankedProjectPhotoIdsByTableName(tableName: string, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], startDate?: string | string[], endDate?: string | string[], noDateTaken?: boolean | boolean[] }): Promise<Record<string, any>>;
  getProjectMonthYearsWithPhotos(tableName: string): Promise<any>;
  updatePhotoInProject(tableName: string, photoId: number, body?: { filePath?: any, title?: any, description?: any, tags?: any }): Promise<PhotoDisplay>;
  updatePhotoRanking(tableName: string, photoId: number, newCategory: string): Promise<Record<string, any>>;
  deletePhotoFromProject(tableName: string, options?: { photoIds?: any }): Promise<Record<string, any>>;
}

export class Projects {
  createProjectAndRun(name: string, type: number, private_?: any, description?: any, directory?: any, photoUploadVector?: any, thumbnail?: any, runName?: any, options?: { outcomes?: any, models?: any }): Promise<ProjectRunDisplay>;
  markProjectUploadComplete(projectTableName: string, options?: { skippedFileCount?: number | number[] }): Promise<any>;
  checkProjectStatus(projectTableName: string): Promise<any>;
  getProjectPrelimModelRequestTemplate(projectTableName: string): Promise<Record<string, any>>;
  getUserProjects(): Promise<ProjectRunDisplay[]>;
  getAdminProjects(): Promise<ProjectRunDisplay[]>;
  getAllUserProjectsAdmin(userId: number): Promise<ProjectRunAdminDisplay[]>;
  getProjectById(projectId: string): Promise<ProjectRunDisplay>;
  getProjectByDirectory(directory: string): Promise<ProjectRunDisplay>;
  updateProject(projectId: string, body?: { private?: any, type?: any, description?: any, directory?: any, name?: any, thumbnail?: any }): Promise<ProjectRunDisplay>;
  updateProjectPhotoCount(tableName: string, options?: { filesFailedCount?: number | number[] }): Promise<Record<string, any>>;
  updateProjectCreateUploadReport(tableName: string, options?: { filesFailedCount?: number | number[] }): Promise<any>;
  requestProjectSimilarityQueue(projectTableName: string, level: string): Promise<Record<string, any>>;
  requestProjectEvidenceQueue(projectTableName: string): Promise<Record<string, any>>;
  requestProjectPersonhoodQueue(projectTableName: string): Promise<Record<string, any>>;
  requestInsightsQueue(analysisLevel: string, identifier: string): Promise<Record<string, any>>;
  requestProjectExport(projectTableName: string): Promise<Record<string, any>>;
  requestProjectAdminExport(projectTableName: string): Promise<Record<string, any>>;
  getProjectProcessStatus(projectTableName: string, modelName: string): Promise<AnalysisStatusResponse>;
  addProjectEvent(projectTableName: string, event: string, detail?: any): Promise<Record<string, any>>;
  deleteProject(projectId: string): Promise<Record<string, any>>;
}

export class Search {
  searchProjectPhotos(projectTableName: string, options?: { andParams?: any, andStringParams?: any, orParams?: any, orStringParams?: any, notParams?: any, notStringParams?: any, dateMin?: string | string[], dateMax?: string | string[], dateNullAnd?: boolean | boolean[], dateNullOr?: boolean | boolean[], dateOrder?: string | string[], customAlbumId?: number | number[], bestOfSimilarSetsOnly?: boolean | boolean[], curatedAlbumId?: number | number[], splitByTier?: boolean | boolean[] }): Promise<Record<string, any>>;
  searchProjectPhotosParametrized(projectTableName: string, options?: { andSearchText?: any, orSearchText?: any, notSearchText?: any, city?: any, country?: any, state?: any, albums?: any, dateMin?: string | string[], dateMax?: string | string[], dateNullAnd?: boolean | boolean[], dateNullOr?: boolean | boolean[], ascOrDesc?: string | string[], bestOfSimilarSetsOnly?: boolean | boolean[], splitByTier?: boolean | boolean[], lastId?: number | number[], limit?: number | number[] }): Promise<Record<string, any>>;
  recallProjectPhotos(projectTableName: string, options?: { ascOrDesc?: string | string[], bestOfSimilarSetsOnly?: boolean | boolean[], lastId?: number | number[], limit?: number | number[] }): Promise<Record<string, any>[]>;
  searchProjectPhotosNaturalLanguage(projectTableName: string, searchText: string, size?: any, options?: { minCosine?: number | number[], labelMinCosine?: number | number[], labelTopK?: number | number[], labelDelta?: number | number[], bestOfSimilarSetsOnly?: boolean | boolean[], splitByTier?: boolean | boolean[] }): Promise<Record<string, any>>;
  getProjectSavedSearches(projectTableName: string): Promise<Record<string, any>>;
  getSavedSearchById(searchId: number): Promise<SearchDisplay>;
  saveProjectPhotosSearch(projectTableName: string, options?: { searchName?: string | string[], andParams?: any, andStringParams?: any, orParams?: any, orStringParams?: any, notParams?: any, notStringParams?: any, dateMin?: string | string[], dateMax?: string | string[], dateNullAnd?: boolean | boolean[], dateNullOr?: boolean | boolean[], dateOrder?: string | string[], customAlbumId?: number | number[], bestOfSimilarSetsOnly?: boolean | boolean[], curatedAlbumId?: number | number[], splitByTier?: boolean | boolean[] }): Promise<Record<string, any>>;
  deleteSavedSearchById(searchId: number): Promise<Record<string, any>>;
}

export class Subscription {
  createSubscription(projectTableName: string, targets: any, callbackUrl?: any): Promise<SubscriptionActivated>;
  verifySubscription(subscriptionId: string): Promise<SubscriptionActivated>;
  listSubscriptions(): Promise<SubscriptionDisplay[]>;
  listSubscriptionEvents(subscriptionId: string, options?: { since?: string | string[], limit?: number | number[] }): Promise<EventPage>;
  updateSubscription(subscriptionId: string, body?: { callbackUrl?: any, targets?: any }): Promise<SubscriptionDisplay>;
  deleteSubscription(subscriptionId: string): Promise<Record<string, any>>;
  rotateSubscriptionSecret(subscriptionId: string): Promise<SubscriptionActivated>;
}

export class Users {
  createUser(name: string, email: string, accountType: number, companyId?: any, profilePicture?: any, paymentPlanType?: any): Promise<UserDisplay>;
  createUserAndCompany(name: string, email: string, password: string, companyId?: any, profilePicture?: any, paymentPlanType?: any, companyName?: any, credits?: any, options?: { inviteToken?: string | string[] }): Promise<UserDisplay>;
  changePassword(oldPassword: string, newPassword: string): Promise<Record<string, any>>;
  getUserId(): Promise<Record<string, any>>;
  getUser(userId: number): Promise<UserDisplayWithCompanyPermissions>;
  getAllUsersByCompany(companyId: number): Promise<UserDisplay[]>;
  getAllUsers(ascOrDesc: string, options?: { lastId?: number | number[], limit?: number | number[] }): Promise<UserDisplayForAdmin[]>;
  updateUser(userId: number, body?: { name?: any, email?: any, password?: any, companyId?: any, accountType?: any, profilePicture?: any, location?: any, phoneNumber?: any, birthday?: any }): Promise<UserDisplay>;
  updateUserByAdmin(userId: number, body?: { name?: any, email?: any, password?: any, companyId?: any, accountType?: any, profilePicture?: any, location?: any, phoneNumber?: any, birthday?: any }): Promise<UserDisplay>;
  deleteUser(userId: number, options?: { newCompanyOwnerId?: number | number[] }): Promise<Record<string, any>>;
}

export class Webhookreceiver {
  listSubscriptionEvents(subscriptionId: string, options?: { since?: string | string[], limit?: number | number[], wait?: number | number[], includeHeavy?: boolean | boolean[] }): Promise<Record<string, any>>;
}

export class MediaViz {
  constructor(config?: MediaVizConfig);
  authenticate(): Promise<TokenResponse>;
  getAuthorizationUrl(state?: string): Promise<AuthorizationUrlResult>;
  handleCallback(code: string, codeVerifier: string): Promise<TokenResponse>;
  setTokens(accessToken: string, refreshToken: string): void;
  readonly accessToken: string | null;
  readonly refreshToken: string | null;
  readonly aiModelCredits: AiModelCredits;
  readonly admin: Admin;
  readonly company: Company;
  readonly curatedAlbums: CuratedAlbums;
  readonly customAlbums: CustomAlbums;
  readonly emailTokens: EmailTokens;
  readonly health: Health;
  readonly keywords: Keywords;
  readonly oAuthAuthorization: OauthAuthorization;
  readonly oAuthClients: OauthClients;
  readonly oAuthToken: OauthToken;
  readonly oauthLogin: OauthLogin;
  readonly person: Person;
  readonly photoUpload: Photoupload;
  readonly photos: Photos;
  readonly projects: Projects;
  readonly search: Search;
  readonly subscription: Subscription;
  readonly users: Users;
  readonly webhookReceiver: Webhookreceiver;
  readonly webhooks: WebhookConsumer;
}

