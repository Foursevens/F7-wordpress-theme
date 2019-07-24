import {graphql, Link, useStaticQuery} from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Cases from "../components/CasesC";

export default function IndexPage() {
    const data = useStaticQuery(graphql`
    query IndexQuery {
      approaches: allWordpressWpApproach(
        filter: { status: { eq: "publish" } }
      ) {
        nodes {
          id
          approach_intro
          title
        }
      }
      cases: allWordpressWpCases(filter: {status: {eq: "publish"}}, limit: 6) {
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
        }
      members: allWordpressWpMembers(
        filter: { status: { eq: "publish" } }
        limit: 3
        sort: { fields: date, order: DESC }
      ) {
        nodes {
          id
          portret {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          function
          skills
          title
        }
      }
    }
  `);
    const {
        approaches: {nodes: approaches},
        cases: {nodes: cases},
        members: {nodes: members},
    } = data;
    return (
        <Layout>
            <SEO title="Home"/>
            <h2>Approach</h2>
            <ul>
                {approaches.map((approach) => (
                    <li key={approach.id}>
                        <h3>{approach.title}</h3>
                        <p>{approach.approach_intro}</p>
                    </li>
                ))}
            </ul>
            <h2>Cases</h2>
            <Cases cases={cases}/>
            <h2>Team</h2>
            <ul style={{display: 'flex'}}>
                {members.map((member) => (
                    <li key={member.id}>
                        <h3>{member.title}</h3>
                        <Img fluid={member.portret.childImageSharp.fluid}/>
                        <sub>{member.function}</sub>
                    </li>
                ))}
            </ul>

        </Layout>
    );
}
