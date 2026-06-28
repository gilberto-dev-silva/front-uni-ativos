<template>
  <Breadcrumb :home="pageConfig" :model="model" :class="containerClass">
    <template #item="{ item, props }">
      <router-link
        v-if="asItem(item).route"
        v-slot="{ href, navigate, isActive }"
        :to="asItem(item).route!"
        custom
      >
        <a
          :href="href"
          v-bind="props.action"
          @click="navigate"
          :class="[
            BREADCRUMB_CLASSES.itemLink,
            isActive ? BREADCRUMB_CLASSES.itemActive : BREADCRUMB_CLASSES.itemInactive,
          ]"
          :aria-current="isActive ? 'page' : undefined"
        >
          <i
            v-if="asItem(item).icon"
            :class="[asItem(item).icon, BREADCRUMB_CLASSES.icon]"
            aria-hidden="true"
          />
          <span>{{ asItem(item).label }}</span>
        </a>
      </router-link>

      <a
        v-else-if="asItem(item).url"
        :href="asItem(item).url"
        :target="asItem(item).target ?? '_self'"
        :rel="asItem(item).target === '_blank' ? 'noopener noreferrer' : undefined"
        v-bind="props.action"
        :class="[BREADCRUMB_CLASSES.itemLink, BREADCRUMB_CLASSES.itemActive]"
      >
        <i
          v-if="asItem(item).icon"
          :class="[asItem(item).icon, BREADCRUMB_CLASSES.icon]"
          aria-hidden="true"
        />
        <span>{{ asItem(item).label }}</span>
        <i
          v-if="asItem(item).target === '_blank'"
          class="pi pi-external-link text-xs ml-1"
          aria-hidden="true"
        />
      </a>
      <span v-else v-bind="props.action" :class="BREADCRUMB_CLASSES.itemStatic" aria-current="page">
        <i
          v-if="asItem(item).icon"
          :class="[asItem(item).icon, BREADCRUMB_CLASSES.icon, 'mr-2']"
          aria-hidden="true"
        />
        {{ asItem(item).label }}
      </span>
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Breadcrumb from "primevue/breadcrumb";
import type { BreadcrumbItem, BreadcrumbProps } from "./Breadcrumb.types";
import { DEFAULT_HOME_ITEM, BREADCRUMB_CLASSES } from "./Breadcrumb.config";

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  pageConfig: () => ({ ...DEFAULT_HOME_ITEM }),
  class: "",
});

const pageConfig = computed<BreadcrumbItem>(() => ({
  ...DEFAULT_HOME_ITEM,
  ...props.pageConfig,
}));

const containerClass = computed(() => ["p-breadcrumb-custom", props.class]);

const asItem = (item: unknown) => item as BreadcrumbItem;
</script>

<style lang="scss" scoped>
.p-breadcrumb-custom {
  padding: 1rem 0;
  background: transparent;
}
</style>
