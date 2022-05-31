// our doman.com/new-meetup

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

import { useRouter } from "next/router";
import { Fragment } from "react/";

import Head from "next/head";

function NewMeeetupPage() {
  const route = useRouter();

  async function addMeetupHandler(enterdMeetupData) {
    console.log(enterdMeetupData);
    const res = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enterdMeetupData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    route.push("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add your own meetup and create amazing network opportunities"
        />
      </Head>
      <NewMeetupForm on onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeeetupPage;
