package com.creditcardcomparison.controller;

import com.creditcardcomparison.dao.JdbcMemberDao;
import com.creditcardcomparison.dao.MemberDao;
import com.creditcardcomparison.dao.PgAdminConnection;
import com.creditcardcomparison.http.HttpMethod;
import com.creditcardcomparison.http.HttpResponse;
import com.creditcardcomparison.http.HttpStatusCode;
import com.creditcardcomparison.model.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "*") // @CrossOrigin(origins = "http://localhost:5173/") // Specify the allowed origin
public class MainController {

    private final HttpMethod GET = HttpMethod.GET;
    private final HttpMethod POST = HttpMethod.POST;

    private HttpResponse response;

    private PgAdminConnection dbConnection  = new PgAdminConnection();


    public String getResponseBody(HttpResponse response) {
        this.response = response;
        response.setHttpStatusCode(HttpStatusCode.SUCCESS_RESPONSE_200_OK);

        if (requestLineMatches(POST, "/sign-up")) {
            return signUp();
        }

        if (requestLineMatches(POST, "/login")) {
            return login();
        }

        if (requestLineMatches(POST, "/")) {
            return examplePost();
        }

        // Default Web Page
        return notFound();
    }


    /** --- Helper Methods --- **/
    private boolean requestLineMatches(HttpMethod httpMethod, String path) {
        if (response != null) {
            if (this.response.getRequestMethod() == httpMethod) {
                if (this.response.getRequestTarget().equals(path)) {
                    return true;
                }
            }
        }
        return false;
    }


    /** ------ Sign Up Response ------ **/
    private String signUp() {
        String requestBody = response.getRequestBody();
        // TODO: get username and password from requestBody JSON

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode jsonNode = objectMapper.readTree(requestBody);
            String username = jsonNode.get("username").asText();
            String password = jsonNode.get("password").asText();

            createNewMember(username, password);

        } catch (JsonMappingException e) {
            response.setHttpStatusCode(HttpStatusCode.CLIENT_ERROR_400_BAD_REQUEST);
        } catch (JsonProcessingException e) {
            response.setHttpStatusCode(HttpStatusCode.CLIENT_ERROR_400_BAD_REQUEST);
        }

        // TODO: Make this dynamic
        return "{ \"response\" : \"Your Account was created.\" }";
    }

    private void createNewMember(String username, String password) {
        MemberDao memberDao = new JdbcMemberDao(dbConnection.getDataSource());
        try {
            Member newMember = memberDao.createNewMember(username, password);
            response.setHttpStatusCode(HttpStatusCode.SUCCESS_RESPONSE_201_CREATED);
        } catch (CannotGetJdbcConnectionException e) {
            response.setHttpStatusCode(HttpStatusCode.SERVER_ERROR_503_SERVICE_UNAVAILABLE);
            e.printStackTrace();
        } catch (DataIntegrityViolationException e) {
            response.setHttpStatusCode(HttpStatusCode.CLIENT_ERROR_400_BAD_REQUEST);
            e.printStackTrace();
        }
    }

    /** ------ Login Response ------ **/
    private String login() {
        String requestBody = response.getRequestBody();
        ObjectMapper objectMapper = new ObjectMapper();

        Member member = null;

        try {
            JsonNode jsonNode = objectMapper.readTree(requestBody);
            String username = jsonNode.get("username").asText();
            String password = jsonNode.get("password").asText();

            member = getExistingMember(username, password);

        } catch (JsonMappingException e) {
            response.setHttpStatusCode(HttpStatusCode.CLIENT_ERROR_400_BAD_REQUEST);
        } catch (JsonProcessingException e) {
            response.setHttpStatusCode(HttpStatusCode.CLIENT_ERROR_400_BAD_REQUEST);
        }

        // TODO: Make this dynamic
        if (member != null) {
            return "{ \"response\" : \"Welcome, " + member.getUsername() + ".\" }";
        } else {
            return "{ \"response\" : \"Could not login.\" }";
        }
    }

    private Member getExistingMember(String username, String password) {
        MemberDao memberDao = new JdbcMemberDao(dbConnection.getDataSource());
        Member member = null;

        try {
            member = memberDao.getMemberByUsernameAndPassword(username, password);
            response.setHttpStatusCode(HttpStatusCode.SUCCESS_RESPONSE_200_OK);
        } catch (CannotGetJdbcConnectionException e) {
            response.setHttpStatusCode(HttpStatusCode.SERVER_ERROR_503_SERVICE_UNAVAILABLE);
            e.printStackTrace();
        } catch (DataIntegrityViolationException e) {
            response.setHttpStatusCode(HttpStatusCode.CLIENT_ERROR_400_BAD_REQUEST);
            e.printStackTrace();
        }

        return member;
    }


    /** ------ Figure Out What to Do With This ------ **/
    private String examplePost() {
        return " { \"response\" : \"This is the example Sign-up Response.\" } ";
    }


    /** ------ Not Found Response ------ **/
    private String notFound() {
        response.setHttpStatusCode(HttpStatusCode.CLIENT_ERROR_404_NOT_FOUND);
        return "";
    }




}
