// our domain.com

import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";

import Head from "next/head";
import { Fragment } from "react";

function Homepage(props) {
  return (
    <Fragment>
      <Head>
        <title>React meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // send http request
  const client = await MongoClient.connect(
    "mongodb+srv://ejim111:Chibuzor121@cluster0.yufrw.mongodb.net/?retryWrites=true&w=majority"
  );

  // connect to database
  const db = client.db();

  // creating and accessing collection
  const meetupCollections = db.collection("meetups");

  const meetups = await meetupCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default Homepage;
