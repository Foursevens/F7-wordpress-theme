import React from 'react';
import {Link, graphql, useStaticQuery} from 'gatsby';
import Img from 'gatsby-image';
import Layout from "../components/layout";
import '../components/layout.css';
import CasesLinks from '../components/CasesLinks';
import Cases from '../components/CasesC'



const CasesPage = () => {

    const data = useStaticQuery(graphql`query {

        sections: allWordpressWpSections {
                      nodes {
                        name
                        id
                      }
                    },
    cases: allWordpressWpCases(filter: {status: {eq: "publish"}}) {
               nodes {
                 id
                 path
                 sections {
                   name
                 }
                 title
                 technologies {
                   name
                 }
                 thumbnail_image {
                   url
                   alt
                   sizes {
                     medium_height
                     medium_width
                   }
                 }
                 type
               }
             }}`);
    const {
        cases: { nodes: cases },
        sections:{nodes: sections}

    } = data;

    return (
    <Layout>
    <div className="mainCases">
        <h3>Cases</h3>
        <CasesLinks sections={sections} cases={cases}/>
        </div>

    </Layout>
    )
};

export default CasesPage
