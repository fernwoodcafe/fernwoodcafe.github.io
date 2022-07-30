<script setup lang="ts">
import NavBar from "@/components/AuthNavBar.vue";
import { RouterLink, RouterView } from "vue-router";

import { useMsal } from "@/auth-msft/useMsal";
import { graphConfig, loginRequest } from "@/authConfig";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";

const { instance, inProgress } = useMsal();
const getData = () => {
  const callMsGraph = async (accessToken: string) => {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch(graphConfig.graphDriveEndpoint, options)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };

  const getGraphData = async () => {
    const response = await instance
      .acquireTokenSilent({
        ...loginRequest,
      })
      .catch(async (e) => {
        if (e instanceof InteractionRequiredAuthError) {
          await instance.acquireTokenRedirect(loginRequest);
        }
        throw e;
      });
    if (inProgress.value === InteractionStatus.None) {
      const graphData = await callMsGraph(response.accessToken);
      return graphData;
    }
  };

  getGraphData().then((x) => console.log("foo", x));
};
</script>

<template>
  <main>
    <header>
      <NavBar />
      <nav>
        <ul>
          <li><RouterLink to="/supplies">Supplies</RouterLink></li>
          <li><RouterLink to="/menu-items">Menu Items</RouterLink></li>
          <li>
            <input type="button" @click="getData" value="New Data" />
          </li>
        </ul>
      </nav>
    </header>
    <article>
      <RouterView />
    </article>
  </main>
</template>

<style></style>
