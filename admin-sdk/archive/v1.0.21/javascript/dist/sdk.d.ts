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

// ── response schemas ──
export interface AlbumDisplay {
  name?: string;
  description?: string;
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
  users?: number[];
  active: boolean;
  payment_plan_type: string;
}

export interface CompanyKeywordListOverview {
  id: number;
  name: string;
  active_keywords: number;
  excluded_keywords: number;
  project_ids?: string[];
}

export interface CompanyOverview {
  company_id: number;
  company_name: string;
  company_owner?: string;
  company_email?: string;
  company_create_date?: string;
  last_activity?: string;
  number_of_users: number;
  number_of_collections: number;
  number_of_photos: number;
  number_of_keywords: number;
  active_keyword_list?: number;
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
  description?: string;
  confidence_value?: number;
}

export interface HealthCheck {
  status?: string;
  timestamp?: string;
  checks?: Record<string, any>;
}

export interface KeywordListDisplayWithList {
  id: number;
  user_id: number;
  company_id: number;
  name: string;
  date_created: string;
  date_last_updated: string;
  is_inclusion?: boolean;
  gsheet_view_link?: string;
  gsheet_csv_link?: string;
  gsheet_xlsx_link?: string;
  list_keywords_included_or_excluded?: number[];
}

export interface KeywordListDisplayWithProjects {
  id: number;
  user_id: number;
  company_id: number;
  name: string;
  date_created: string;
  date_last_updated: string;
  is_inclusion?: boolean;
  list_projects_associated?: string[];
}

export interface PhotoDisplay {
  photo_s3_link: string;
  client_side_id?: string;
  moment_id?: number;
  file_path?: string;
  image_metadata?: Record<string, any>;
  tags?: string[];
  title?: string;
  description?: string;
  format?: string;
  size?: string;
  source_resolution_x?: number;
  source_resolution_y?: number;
  date_taken?: string;
  date_modified?: string;
  date_guessed?: string;
  date_uploaded?: string;
  latitude?: number;
  longitude?: number;
  country_code?: string;
  country?: string;
  state?: string;
  city?: string;
  average_hash?: string;
  perceptual_hash?: string;
  difference_hash?: string;
  wavelet_hash_haar?: string;
  color_hash?: string;
  reference_1_average_distance?: number;
  reference_2_average_distance?: number;
  reference_3_average_distance?: number;
  main_color_palette?: string[];
  color_averages?: string[];
  labels_from_classifications_model?: Record<string, any>;
  ocr_output?: Record<string, any>;
  bounding_boxes_from_faces_model?: Record<string, any>[];
  number_of_faces?: number;
  blur_value?: number;
  feature_extraction_output?: number[];
  similar_photo_ids_high?: number[];
  similar_photo_ids_medium?: number[];
  similar_photo_ids_low?: number[];
  evidence_score?: number;
  face_score?: number;
  content_score?: number;
  aesthetic_score?: number;
  similarity_set_ranking?: number;
  topic?: string;
  rank?: number;
  hue_values?: number[];
  light_values?: number[];
  saturation_values?: number[];
  user_id: number;
  company_id: number;
  id: number;
  project_table_name: string;
}

export interface PhotoFace {
  smile_value?: boolean;
  smile_confidence?: number;
  eyeglasses_value?: boolean;
  eyeglasses_confidence?: number;
  sunglasses_value?: boolean;
  sunglasses_confidence?: number;
  eyes_open_value?: boolean;
  eyes_open_confidence?: number;
  emotion_happy_confidence?: number;
  emotion_sad_confidence?: number;
  landmark_eyeleft_x?: number;
  landmark_eyeleft_y?: number;
  landmark_eyeright_x?: number;
  landmark_eyeright_y?: number;
  landmark_mouthleft_x?: number;
  landmark_mouthleft_y?: number;
  landmark_mouthright_x?: number;
  landmark_mouthright_y?: number;
  landmark_nose_x?: number;
  landmark_nose_y?: number;
  pose_roll?: number;
  pose_yaw?: number;
  pose_pitch?: number;
  quality_brightness?: number;
  quality_sharpness?: number;
  face_occluded_value?: boolean;
  eye_direction_yaw?: number;
  eye_direction_pitch?: number;
  eye_direction_confidence?: number;
}

export interface PhotoPersonLight {
  id: number;
  person_id: string;
  bounding_box: Record<string, any>;
  confidence: number;
  person_name: string;
}

export interface PhotoPersonWithS3Link {
  id: number;
  person_id: string;
  bounding_box: Record<string, any>;
  confidence: number;
  person_name: string;
  photo_s3_link: string;
}

export interface ProjectRunAdminDisplay {
  name: string;
  private?: boolean;
  type?: number;
  description?: string;
  directory?: string;
  photo_upload_vector?: number;
  thumbnail?: string;
  run_name?: string;
  id: string;
  user_id: number;
  company_id: number;
  active: boolean;
  project_table_name: string;
  date_created: string;
  number_of_photos?: number;
  date_photos_uploaded?: string;
  date_deleted?: string;
  top_tier?: number;
  tier_2?: number;
  total_photos_uploaded?: number;
  gsheet_view_link?: string;
  gsheet_csv_link?: string;
  gsheet_xlsx_link?: string;
  insights_view_link?: string;
  similarity_level?: string;
  blur_model?: boolean;
  colors_model?: boolean;
  face_recognition_model?: boolean;
  image_classification_model?: boolean;
  image_comparison_model?: boolean;
  image_describe_model?: boolean;
  ocr_model?: boolean;
  similarity_model?: boolean;
  personhood_model?: boolean;
  evidence_model?: boolean;
  insights_model?: boolean;
  normalize?: boolean;
  files_attempted_count: number;
  failed_files_count: number;
}

export interface ProjectRunDisplay {
  name: string;
  private?: boolean;
  type?: number;
  description?: string;
  directory?: string;
  photo_upload_vector?: number;
  thumbnail?: string;
  run_name?: string;
  id: string;
  user_id: number;
  company_id: number;
  active: boolean;
  project_table_name: string;
  date_created: string;
  number_of_photos?: number;
  date_photos_uploaded?: string;
  date_deleted?: string;
  top_tier?: number;
  tier_2?: number;
  total_photos_uploaded?: number;
  gsheet_view_link?: string;
  gsheet_csv_link?: string;
  gsheet_xlsx_link?: string;
  insights_view_link?: string;
  similarity_level?: string;
  blur_model?: boolean;
  colors_model?: boolean;
  face_recognition_model?: boolean;
  image_classification_model?: boolean;
  image_comparison_model?: boolean;
  image_describe_model?: boolean;
  ocr_model?: boolean;
  similarity_model?: boolean;
  personhood_model?: boolean;
  evidence_model?: boolean;
  insights_model?: boolean;
  normalize?: boolean;
}

export interface SearchDisplay {
  id: number;
  project_table_name: string;
  search_name: string;
  and_params?: string[];
  and_string_params?: string[];
  or_params?: string[];
  or_string_params?: string[];
  not_params?: string[];
  not_string_params?: string[];
  date_min?: string;
  date_max?: string;
  date_null_and?: boolean;
  date_null_or?: boolean;
  date_order?: string;
  custom_album_id?: number;
  best_of_similar_sets_only?: boolean;
  curated_album_id?: number;
}

export interface UserDisplay {
  id: number;
  company_id: number;
  name: string;
  email: string;
  account_type: number;
  location?: string;
  phone_number?: string;
  birthday?: string;
  profile_picture?: string;
}

export interface UserDisplayForAdmin {
  name: string;
  company_name: string;
  id: number;
  company_id: number;
  email: string;
  last_login?: string;
  account_type: number;
  total_photos_uploaded: number;
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
  adminCreateCompanyNlpIndexes(options?: { companyIds?: any }): Promise<Record<string, any>>;
  adminCreateLabelVocabIndex(): Promise<Record<string, any>>;
  adminTriggerNlpPopulateAllActiveProjects(): Promise<Record<string, any>>;
  adminClearNlSearchCache(): Promise<Record<string, any>>;
  adminDeleteCompanyNlpIndexes(options?: { companyIds?: any }): Promise<Record<string, any>>;
  adminDeleteUserProjects(options?: { userIds?: any }): Promise<Record<string, any>>;
  adminDeleteUser(options?: { userIds?: any }): Promise<Record<string, any>>;
}

export class Company {
  adminGetCompanies(): Promise<CompanyOverview[]>;
  getAllCompanies(): Promise<CompanyDisplay[]>;
  getCompanyById(companyId: number): Promise<CompanyDisplay>;
  confirmCompanyCreditBalance(companyId: number, options?: { photoCount?: number | number[], modelsList?: string[] | string[][] }): Promise<CreditBalanceOutput>;
  adminListActiveCompanyTokens(): Promise<CompanyCreationTokenDisplay[]>;
  adminCreateCompanyToken(options?: { email?: string | string[] }): Promise<CompanyCreationTokenDisplay>;
  adminRevokeCompanyToken(tokenId: number): Promise<Record<string, any>>;
}

export class CuratedAlbums {
  createCuratedAlbum(projectTableName: string, name: string, description?: string, confidenceValue?: number): Promise<CuratedAlbumDisplay>;
  getAllProjectCuratedAlbums(projectTableName: string): Promise<CuratedAlbumDisplay[]>;
  getCuratedAlbumPhotos(albumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], confidenceValue?: number | number[] }): Promise<any[]>;
  getCuratedAlbumPhotosRanked(albumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], confidenceValue?: number | number[] }): Promise<Record<string, any>>;
  getCuratedAlbumById(albumId: number): Promise<CuratedAlbumDisplay>;
  updateCuratedAlbum(albumId: number, body?: { name?: string, description?: string, confidenceValue?: number }): Promise<CuratedAlbumDisplay>;
  deleteCuratedAlbum(albumId: number): Promise<Record<string, any>>;
  convertCuratedAlbumToCustom(albumId: number): Promise<CuratedAlbumDisplay>;
}

export class CustomAlbums {
  getCustomAlbumDetailById(customAlbumId: number): Promise<AlbumDisplay>;
  getAllProjectCustomAlbums(projectTableName: string): Promise<AlbumDisplay[]>;
  getCustomAlbumPhotosById(customAlbumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[] }): Promise<any>;
  getRankedCustomAlbumById(customAlbumId: number, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[] }): Promise<Record<string, any>>;
  createProjectCustomAlbum(projectTableName: string, body?: { name?: string, description?: string, photoIdInclusionList?: number[], photoIdRemovalList?: number[] }): Promise<AlbumDisplay>;
  updateCustomAlbum(albumId: number, body?: { name?: string, description?: string, photoIdInclusionList?: number[], photoIdRemovalList?: number[] }): Promise<AlbumDisplay>;
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
  createKeywordFilteringList(name: string, projectList?: string[]): Promise<KeywordListDisplayWithProjects>;
  adminCreateKeywordFilteringList(name: string, companyId: number, projectList?: string[]): Promise<KeywordListDisplayWithProjects>;
  getUserKeywordFilteringLists(): Promise<KeywordListDisplayWithProjects[]>;
  getCompanyKeywordLists(companyId: number): Promise<CompanyKeywordListOverview[]>;
  getKeywordFilteringListAndProjectsById(keywordListId: number): Promise<KeywordListDisplayWithProjects>;
  getKeywordFilteringListById(keywordListId: number): Promise<KeywordListDisplayWithList>;
  getExistingKeywordFilteringListByProject(projectTableName: string): Promise<Record<string, any>>;
  getDefaultKeywordFilteringListByProject(projectTableName: string): Promise<Record<string, any>>;
  updateKeywordFilteringListLabels(keywordListId: number, listKeywordsToInclude: number[], listKeywordsToExclude: number[]): Promise<KeywordListDisplayWithList>;
  updateKeywordFilteringListDetails(keywordListId: number, body?: { name?: string, projectList?: string[] }): Promise<KeywordListDisplayWithProjects>;
  addProjectsToKeywordFilteringList(keywordListId: number, options?: { projectIds?: any }): Promise<Record<string, any>>;
  adminAddProjectsToKeywordFilteringList(keywordListId: number, options?: { projectIds?: any }): Promise<Record<string, any>>;
  addCompanyToKeywordFilteringList(keywordListId: number, options?: { companyId?: number | number[] }): Promise<Record<string, any>>;
  adminAddCompanyToKeywordFilteringList(keywordListId: number, options?: { companyId?: number | number[] }): Promise<Record<string, any>>;
  requestKeywordListExport(keywordListId: number): Promise<Record<string, any>>;
  requestKeywordListExportStatus(keywordListId: number): Promise<AnalysisStatusResponse>;
  getKeywordsAndIds(): Promise<any>;
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
  createClient(clientName: string, clientType: string, grantTypes: any, isFirstParty: boolean, redirectUris?: any, companyId?: number): Promise<Record<string, any>>;
}

export class OauthToken {
  token(body: { grantType: string, code: string, redirectUri: string, clientId: string, codeVerifier: string, refreshToken: string, clientSecret: string }): Promise<Record<string, any>>;
  adminRevokeUserTokens(userId: number): Promise<Record<string, any>>;
  revoke(body: { token: string, tokenTypeHint: string, clientId: string }): Promise<any>;
}

export class OauthLogin {
  getLogin(options?: { next?: string | string[] }): Promise<any>;
  postLogin(body: { email: string, password: string, next: string }): Promise<any>;
}

export class Person {
  updatePerson(projectTableName: string, personId: string, options?: { personName?: string | string[] }): Promise<any>;
  combinePersons(projectTableName: string, destinationPersonId: string, oldPersonId: string): Promise<PhotoPersonLight>;
  splitPersons(projectTableName: string, id: number, options?: { newName?: string | string[], destinationPersonId?: string | string[] }): Promise<PhotoPersonLight>;
  getAllPersonsFromProject(projectTableName: string): Promise<PhotoPersonWithS3Link[]>;
  getAllPersonNamesFromProject(projectTableName: string): Promise<any>;
  getPhotoIdsByPersons(projectTableName: string, options?: { personId?: string[] | string[][] }): Promise<any>;
  getAllPersonsFromPhoto(projectTableName: string, photoId: number): Promise<PhotoPersonLight[]>;
}

export class Photoupload {
  uploadPhotoToMediaviz(companyId: string, userId: string, projectTableName: string, title: string, body: { fileContent: string, mimetype: string, filePath: string }, headerOptions?: { clientSideId?: string, blur?: string, colors?: string, faceRecognition?: string, imageDescribe?: string, imageClassification?: string, imageComparison?: string, size?: string, sourceResolutionX?: string, sourceResolutionY?: string, dateTaken?: string, latitude?: string, longitude?: string, ocr?: string }): Promise<any>;
  uploadPhoto(projectTableName: string, companyId: string, userId: string, photoIndex: number, photo: Record<string, any>): Promise<any>;
}

export class Photos {
  getPhotoFromProject(tableName: string, photoId: number, options?: { keywordListId?: number | number[] }): Promise<PhotoDisplay>;
  getPhotoFaceDetailsFromProject(tableName: string, photoId: number): Promise<PhotoFace[]>;
  getProjectPhotoIdsByTableName(tableName: string, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], includeAll?: boolean | boolean[], startDate?: string | string[], endDate?: string | string[], noDateTaken?: boolean | boolean[] }): Promise<any>;
  getRankedProjectPhotoIdsByTableName(tableName: string, options?: { ascOrDesc?: string | string[], lastId?: number | number[], limit?: number | number[], startDate?: string | string[], endDate?: string | string[], noDateTaken?: boolean | boolean[] }): Promise<Record<string, any>>;
  getProjectMonthYearsWithPhotos(tableName: string): Promise<any>;
  updatePhotoInProject(options?: { tableName?: string | string[], photoId?: number | number[], photoData?: Record<string, any> | Record<string, any>[] }): Promise<PhotoDisplay>;
  updatePhotoRanking(tableName: string, photoId: number, newCategory: string): Promise<Record<string, any>>;
  deletePhotoFromProject(tableName: string, options?: { photoIds?: any }): Promise<Record<string, any>>;
}

export class Projects {
  createProjectAndRun(name: string, private_?: boolean, type?: number, description?: string, directory?: string, photoUploadVector?: number, thumbnail?: string, runName?: string, options?: { outcomes?: any, models?: any }): Promise<ProjectRunDisplay>;
  markProjectUploadComplete(projectTableName: string, options?: { skippedFileCount?: number | number[] }): Promise<any>;
  checkProjectStatus(projectTableName: string): Promise<any>;
  getProjectPrelimModelRequestTemplate(projectTableName: string): Promise<Record<string, any>>;
  getUserProjects(): Promise<ProjectRunDisplay[]>;
  getAdminProjects(): Promise<ProjectRunDisplay[]>;
  getAllUserProjectsAdmin(userId: number): Promise<ProjectRunAdminDisplay[]>;
  getProjectById(projectId: string): Promise<ProjectRunDisplay>;
  getProjectByDirectory(directory: string): Promise<ProjectRunDisplay>;
  updateProject(projectId: string, body?: { private?: boolean, type?: number, description?: string, directory?: string, name?: string, thumbnail?: string }): Promise<ProjectRunDisplay>;
  updateProjectPhotoCount(tableName: string, options?: { filesFailedCount?: number | number[] }): Promise<any>;
  updateProjectCreateUploadReport(tableName: string, options?: { filesFailedCount?: number | number[] }): Promise<any>;
  requestProjectSimilarityQueue(projectTableName: string, level: string): Promise<Record<string, any>>;
  requestProjectEvidenceQueue(projectTableName: string): Promise<Record<string, any>>;
  requestProjectPersonhoodQueue(projectTableName: string): Promise<Record<string, any>>;
  requestInsightsQueue(analysisLevel: string, identifier: string): Promise<Record<string, any>>;
  requestProjectExport(projectTableName: string): Promise<Record<string, any>>;
  requestProjectAdminExport(projectTableName: string): Promise<Record<string, any>>;
  getProjectDataExportUploadStatus(projectTableName: string, modelName: string): Promise<AnalysisStatusResponse>;
  addProjectEvent(projectTableName: string, event: string, detail?: string): Promise<Record<string, any>>;
  deleteProject(projectId: string): Promise<Record<string, any>>;
}

export class Search {
  searchProjectPhotos(projectTableName: string, options?: { andParams?: any, andStringParams?: any, orParams?: any, orStringParams?: any, notParams?: any, notStringParams?: any, dateMin?: string | string[], dateMax?: string | string[], dateNullAnd?: boolean | boolean[], dateNullOr?: boolean | boolean[], dateOrder?: string | string[], customAlbumId?: number | number[], bestOfSimilarSetsOnly?: boolean | boolean[], curatedAlbumId?: number | number[], splitByTier?: boolean | boolean[] }): Promise<Record<string, any>>;
  searchProjectPhotosParametrized(projectTableName: string, options?: { andSearchText?: any, orSearchText?: any, notSearchText?: any, city?: any, country?: any, state?: any, albums?: any, dateMin?: string | string[], dateMax?: string | string[], dateNullAnd?: boolean | boolean[], dateNullOr?: boolean | boolean[], ascOrDesc?: string | string[], bestOfSimilarSetsOnly?: boolean | boolean[], splitByTier?: boolean | boolean[], lastId?: number | number[], limit?: number | number[] }): Promise<Record<string, any>>;
  recallProjectPhotos(projectTableName: string, options?: { ascOrDesc?: string | string[], bestOfSimilarSetsOnly?: boolean | boolean[], lastId?: number | number[], limit?: number | number[] }): Promise<any>;
  searchProjectPhotosNaturalLanguage(projectTableName: string, searchText: string, size?: number, options?: { minCosine?: number | number[], labelMinCosine?: number | number[], labelTopK?: number | number[], labelDelta?: number | number[], bestOfSimilarSetsOnly?: boolean | boolean[], splitByTier?: boolean | boolean[] }): Promise<Record<string, any>>;
  getProjectSavedSearches(projectTableName: string): Promise<any>;
  getSavedSearchById(searchId: number): Promise<SearchDisplay>;
  saveProjectPhotosSearch(projectTableName: string, options?: { searchName?: string | string[], andParams?: any, andStringParams?: any, orParams?: any, orStringParams?: any, notParams?: any, notStringParams?: any, dateMin?: string | string[], dateMax?: string | string[], dateNullAnd?: boolean | boolean[], dateNullOr?: boolean | boolean[], dateOrder?: string | string[], customAlbumId?: number | number[], bestOfSimilarSetsOnly?: boolean | boolean[], curatedAlbumId?: number | number[], splitByTier?: boolean | boolean[] }): Promise<Record<string, any>>;
  deleteSavedSearchById(searchId: number): Promise<Record<string, any>>;
}

export class Users {
  createUser(name: string, email: string, accountType: number, companyId?: number, profilePicture?: string, paymentPlanType?: string): Promise<UserDisplay>;
  createUserAndCompany(name: string, email: string, password: string, companyId?: number, profilePicture?: string, paymentPlanType?: string, companyName?: string, credits?: number, options?: { inviteToken?: string | string[] }): Promise<UserDisplay>;
  changePassword(oldPassword: string, newPassword: string): Promise<Record<string, any>>;
  getUserId(): Promise<Record<string, any>>;
  getUser(userId: number): Promise<UserDisplay>;
  getAllUsersByCompany(companyId: number): Promise<UserDisplay[]>;
  getAllUsers(ascOrDesc: string, options?: { lastId?: number | number[], limit?: number | number[] }): Promise<UserDisplayForAdmin[]>;
  updateUser(userId: number, body?: { name?: string, email?: string, password?: string, companyId?: number, accountType?: number, profilePicture?: string, location?: string, phoneNumber?: string, birthday?: string }): Promise<UserDisplay>;
  updateUserByAdmin(userId: number, body?: { name?: string, email?: string, password?: string, companyId?: number, accountType?: number, profilePicture?: string, location?: string, phoneNumber?: string, birthday?: string }): Promise<UserDisplay>;
  deleteUser(userId: number, options?: { newCompanyOwnerId?: number | number[] }): Promise<Record<string, any>>;
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
  readonly users: Users;
}

