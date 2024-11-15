import React , {useState, useEffects} from "react"
import Articles from "../components/articles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"
import ReactMarkdown from "react-markdown"








function csvJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step 
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

      var obj = {};
      var currentline=lines[i].split(",");

      for(var j=0;j<headers.length;j++){
          obj[headers[j]] = currentline[j];
      }

      result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}







const FacebookReport = () => {
   const [facebookReport, setFacebookReport] = useState(null);
   const [loading, setLoading] = useState(false)

   const readFacebookCsv = (e) => {
    console.log(e.target.value)
    const file = e.target.files[0]
    console.log(file)


    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function() {
    console.log(reader.result);
    console.log(csvJSON(reader.result))

    const JSONtoSend = csvJSON(reader.result)
    setFacebookReport(JSONtoSend)
   // const sendFacebookReport = await axios.post("https://giving-hearts.herokuapp.com/api/create-stripe-session", JSONtoSend   );
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

/*
    let fr = new FileReader();
    fr.onload = receivedText;
    fr.readAsText(file);

 function receivedText() {
      console.log(fr.result);
    }
    */
  };

   const submitReport  = async (e) => {
    console.log(facebookReport)

    const sendReport = await axios.post(
      "http://localhost:3000/api/facebook-report",
      {
        report: facebookReport,
      }
    );

    console.log(sendReport)
  };

return (
    <>
    {!loading &&
      <>
      <h3>Facebook Report</h3>
      <input
        name="facebookReport"
        type="file"
        accept=".csv"
        onChange={(event) => {
          readFacebookCsv(event);
        }}
      />

    
      <button
        onClick={submitReport }
        className="btn-primary small header-btn-hidde-on-mb w-button"
      >
        Submit
      </button>
      </>
    }

    {loading && <p>Loading...</p>}
    </>
  );


}



const BenevityReport = () => {
   const [benevityReport, setBenevityReport] = useState(null); 
   const [loading, setLoading] = useState(false)

  const readBenevityCsv = (e) => {
    console.log(e.target.value)
    const file = e.target.files[0]
    console.log(file)


    let reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function() {
    console.log(reader.result);

    let str = reader.result;

    //console.log(typeof(reader.result))

    const start = str.indexOf('Company,')
    const end = str.indexOf('Totals,')

    str = str.slice(start,end);

    console.log(csvJSON(str))

    const JSONtoSend = csvJSON(str)
    setBenevityReport(JSONtoSend)
  }

    reader.onerror = function() {
    console.log(reader.error);
  }

  } 

  const submitReport  = async (e) => {

     console.log(benevityReport)
   
    const sendReport = await axios.post(
      "http://localhost:3000/api/benevity-report",
      {
        report: benevityReport,
      }
    );
 
console.log(sendReport)

  };

  return (
    <>
    {!loading &&
      <>
 
      <h3>Benevity Report</h3>
      <input
        name="benevityReport"
        type="file"
        accept=".csv"
        onChange={(event) => {
          readBenevityCsv(event);
        }}
      />

      <button
        onClick={submitReport}
        className="btn-primary small header-btn-hidde-on-mb w-button"
      >
        Submit
      </button>
      </>
    }

    {loading && <p>Loading...</p>}
    </>
  );

}





const Reports = ({ articles, categories, homepage, projects, about }) => {
    console.log(about.data.attributes.About)
    return (
        <Layout categories={categories} projects={projects}>
      <Seo seo={homepage.attributes.seo} /> {/* !!!! ABOUT SEO */}
      <div className="uk-section">
        <div className="uk-container uk-container-small">
           <BenevityReport />
    <FacebookReport />
        </div>
      </div>
    </Layout>
    )
}

/// ????
export async function getStaticProps() {
    // Run API calls in parallel

    /*
    const [articlesRes, categoriesRes, homepageRes, about, projects] =
    await Promise.all([
        fetchAPI("https://giv-back.herokuapp.com/api/articles", {
            populate: "*",
        }),
        fetchAPI("https://giv-back.herokuapp.com/api/categories", {
            populate: "*",
        }),
        fetchAPI("https://giv-back.herokuapp.com/api/homepage", {
            populate: {
                hero: "*",
                seo: { populate: "*" },
            },
        }),

        fetchAPI("https://giv-back.herokuapp.com/api/about", {
            populate: "*",
        }),

        fetchAPI("https://giv-back.herokuapp.com/api/projects", {
            populate: "*",
            filters: {
                status: {
                    $eq: true,
                },
            },
        }),
    ])
*/
    return {
        props: {
          /*
            articles: articlesRes.data,
            categories: categoriesRes.data,
            homepage: homepageRes.data,
            projects: projects.data,
            about: about,
            */
        },
        revalidate: 1,
    }
}

export default Reports;