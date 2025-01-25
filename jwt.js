import jwt from "jsonwebtoken";
import config from "./config.js";

const { jwtSecret } = config.server;

/**
 * Validates a JSON web token.
 *
 * @param {string} token - the JSON web token to be validated
 * @return {Promise} A promise that resolves to the decoded token payload if the token is valid, or rejects with an error otherwise.
 */
export function validarJwt(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                return reject(err);
            } 
            return resolve(decoded);
        })
    })
}

/**
 * Generates a JSON Web Token (JWT) based on a given payload and a secret key.
 *
 * @param {Object} payload - The data to be included in the JWT.
 * @return {string} The JWT generated from the provided payload and secret key.
 */
export function gerarToken(payload) {
    return jwt.sign(payload, jwtSecret);
}