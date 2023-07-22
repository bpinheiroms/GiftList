const express = require("express");
const verifyProof = require("../utils/verifyProof");
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const port = 1225;

const app = express();
app.use(express.json());

app.post("/gift", (req, res) => {
  const { name } = req.body;

  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  const index = merkleTree.getIndex(niceList, name);
  const proof = merkleTree.getProof(index);

  const isInTheList = verifyProof(proof, name, root);

  isInTheList
    ? res.send("You got a toy robot!")
    : res.send("You are not on the list :(");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
