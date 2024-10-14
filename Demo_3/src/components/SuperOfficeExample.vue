<template>
  <el-form label-width="120px">
    <!-- An initial value can be set like this (array of numbers when element is 'multiple' type)-->
    <el-form-item label="Firma">
      <SelectContact
        v-model="contact"
        min-width="500px"
        multiple
        :initialValue="['1', '2']"
      ></SelectContact>
    </el-form-item>

    <!-- Or as a number when element is not 'multiple'-->
    <el-form-item label="Personer">
      <SelectPerson v-model="person" min-width="500px" :initialValue="5"></SelectPerson>
    </el-form-item>

    <!-- Setting additionalFields will add those fields to fetched object -->
    <el-form-item label="Medarbeidere">
      <SelectAssociate
        v-model="associate"
        min-width="500px"
        :additionalFields="['firstName', 'lastName']"
      ></SelectAssociate>
    </el-form-item>

    <el-form-item label="Salg">
      <SelectSale v-model="sale" min-width="500px"></SelectSale>
    </el-form-item>

    <el-form-item>
      <el-button type="success">Lagre</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import SelectContact from "./superoffice/selectors/SelectContact.vue";
  import SelectPerson from "./superoffice/selectors/SelectPerson.vue";
  import SelectAssociate from "./superoffice/selectors/SelectAssociate.vue";
  import SelectSale from "./superoffice/selectors/SelectSale.vue";

  const contact = ref();
  const person = ref();
  const associate = ref();
  const sale = ref();
</script>

<style scoped></style>
