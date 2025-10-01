const pool = require('../db/db')

function authorizeCard(themeId) {
    return (req, res, next) => {
        const requete = `
            SELECT * 
            FROM autoriser aut 
            INNER JOIN themes the ON aut.Id_themes = the.Id_themes 
            WHERE aut.Id_users = ? AND aut.Id_themes = ?`;

        const donnees = [req.session.authed, themeId];

        pool.query(requete, donnees, (err, result) => {
            if (err) {
                return res.status(501).json({ message: "Impossible d'exécuter la requête !" });
            }

            if (result.length === 0) {
                return res.status(403).json({ unauthorized: "Vous n'avez pas les autorisations pour cette card !" });
            }

            next(); 
        });
    };
}

module.exports = authorizeCard;
