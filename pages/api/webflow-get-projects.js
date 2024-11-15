// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const Webflow = require('webflow-api');
const api = new Webflow({ token: '441b50f70f0ee0dbf5d486085126791405b74f69e93380ca61e65a54d49400ce' });

export default async (req, res) => {


   // const request = `https://api.webflow.com/collections/624f1de46ce3122756ce03d8/items?api_version=1.0.0&access_token=441b50f70f0ee0dbf5d486085126791405b74f69e93380ca61e65a54d49400ce`;
  // const items = await api.items({ collectionId: '624f1de46ce3122756ce03d8' });

  const itemsPre = await api.items({ collectionId: '63360df4627e8c4ca73b7b13' });

 const items = itemsPre.items.filter(item => item["blog-post-category"] === "63360df4627e8c55453b7bb0")
 


    res.status(200).json({ items: items })
}

//624f1de46ce3124b98ce036c

//63360df4627e8c55453b7bb0