const express = require('express');

function createRouter(db) {
  const router = express.Router();
  const username = '';


  router.get('/nurseryUserData/logging-in', function (req, res, next) {
    console.log('in back end get requesttttttttttttttttttttttttttttttttt')
    console.log(req.query, 'query')
    
    db.query(
      'SELECT adult_first_name,adult_last_name, child_first_name,child_last_name, phoneMobile, phoneHome  FROM nurseryUserData WHERE username=? ',
      [req.query.username,  10*(req.params.page || 0)],
      (error, results) => {
        if (error) {
          console.log(error, 'error');
          res.status(500).json({status: 'error'});
        } else {
          console.log('results are: ',results)
          res.status(200).json({status: results[0]});
        }
      }
    );
  });




  router.post('/nurseryUserData', (req, res, next) => {
    console.log(req.body)
    db.query(
      'INSERT INTO nurseryUserData (username, email, password, adult_first_name, adult_last_name, child_first_name, child_last_name, phoneHome, phoneMobile ) VALUES (?,?,?,?,?,?,?,?,?)',
      [req.body.username, req.body.email, req.body.password, req.body.name, req.body.parentLastName, req.body.childName, req.body.childLastName, req.body.phoneHome, req.body.phoneMob],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // router.get('/nurseryUserData', function (req, res, next) {
  //   db.query(
  //     'SELECT id, adult_first_name, child_first_name FROM nurseryUserData WHERE adult_first_name=? ',
  //     [req.body.adult_first_name, 10*(req.params.page || 0)],
  //     (error, results) => {
  //       if (error) {
  //         console.log(error);
  //         res.status(500).json({status: 'error'});
  //       } else {
  //         res.status(200).json(results);
  //       }
  //     }
  //   );
  // });

  // router.put('/nurseryUserData/:id', function (req, res, next) {
  //   db.query(
  //     'UPDATE nurseryUserData SET username=?, phoneMobile=?, date=? WHERE id=? AND username=?',
  //     [req.body.username, req.body.phoneMobile, new Date(req.body.date), req.params.id, username],
  //     (error) => {
  //       if (error) {
  //         res.status(500).json({status: 'error'});
  //       } else {
  //         res.status(200).json({status: 'ok'});
  //       }
  //     }
  //   );
  // });

  // router.delete('/nurseryUserData/:id', function (req, res, next) {
  //   db.query(
  //     'DELETE FROM nurseryUserData WHERE id=? AND username=?',
  //     [req.params.id, username],
  //     (error) => {
  //       if (error) {
  //         res.status(500).json({status: 'error'});
  //       } else {
  //         res.status(200).json({status: 'ok'});
  //       }
  //     }
  //   );
  // });

  return router;
}

module.exports = createRouter;