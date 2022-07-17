<template>
  <h1>Menu Items</h1>
  <form>
    <input placeholder="Menu Item Name" v-model="newMenuItem.menuItemName" />
    <button @click="onClickNewMenuItem">New Menu Item</button>
  </form>

  <nav>
    <ul>
      <li :key="item.id" v-for="item in menuItemsList.items">
        <RouterLink :to="`/menu-items/${item.menuItemName}`">{{
          item.menuItemName
        }}</RouterLink>
      </li>
    </ul>
  </nav>

  <RouterView :key="$route.fullPath" />
</template>

<script setup lang="ts">
type Props = {
  menuItemsList: ReactiveArray<CafeDomain.MenuItem>;
  sendCommand: (Command: CafeDomain.DomainCommand) => Promise<void>;
};

const props = defineProps<Props>();

const newMenuItem: CafeDomain.MenuItem = {
  menuItemName: "",
  ingredients: [],
  packaging: [],
};

const onClickNewMenuItem = () => {
  props.sendCommand({
    type: "create_menu_item",
    payload: newMenuItem,
  });
};
</script>
