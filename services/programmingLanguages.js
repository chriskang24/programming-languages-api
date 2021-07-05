const db = require('./db');
const helper = require('../helper');
const config = require('../config');



// acts as the bridge between the route and the database as follows:
async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages
    LIMIT ?, ?`,
    [offset, config.listPerPage]
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

/* POST programming language */
async function create(programmingLanguage) {
  const result = await db.query(
    `INSERT INTO programming_languages
      (name, released_year, githut_rank, pypl_rank, tiobe_rank)
      VALUES
      (?, ?, ?, ?, ?)`,
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank
    ]
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return { message };
}

/* PUT to update an existing programming language */

async function update(id, programmingLanguage) {
  const result = await db.query(
    `UPDATE programming_languages
    SET name=?, released_year=?, githut_rank=?, pypl_rank=?, tiobe_rank=?
    WHERE id=?
    `,
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank, id
    ]
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return { message };
}

/* DELETE to delete an existing programming language */

async function remove(id) {
  const result = await db.query(
    `DELETE FROM programming_languages
    WHERE ID=?
    `,
    [id]
  );

  let message = 'Error in deleting programming language';

  if (results.affectedRows) {
    message = 'Programming language deleted successfully'
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}