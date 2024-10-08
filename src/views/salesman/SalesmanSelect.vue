<template>
  <div class="custom-select">
    <div class="selected-option" @click="toggleDropdown">{{ selectedOption }}</div>
    <ul v-if="isDropdownOpen" class="options-list">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="option-item"
        @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  setup(props) {
    const isDropdownOpen = ref(false);
    const selectedOption = ref(props.placeholder);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const selectOption = (option) => {
      selectedOption.value = option;
      isDropdownOpen.value = false;
    };

    return {
      isDropdownOpen,
      selectedOption,
      toggleDropdown,
      selectOption,
    };
  },
};
</script>

<style scoped>
.custom-select {
  width: 100%;
  max-width: 300px;
  border: 2px solid #007bff;
  border-radius: 8px;
}

.selected-option {
  padding: 12px;
  background-color: #f8f9fa;
}

.options-list {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.option-item:hover {
  background-color: #e2e6ea;
  cursor: pointer;
}

</style>
