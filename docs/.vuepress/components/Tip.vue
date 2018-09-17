<template>
  <div :class="[typeClass, 'custom-block']" vp-markdown>
    <p class="custom-block-title">{{ titleText }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    title: String,
    type: {
      default: 'tip',
      type: String,
      validator: value => ['tip', 'warn', 'danger'].includes(value),
    },
  },
  computed: {
    typeClass() {
      return this.type === 'warn' ? 'warning' : this.type;
    },
    titleText() {
      if (this.title) return this.title;
      if (this.type === 'warn') return 'WARNING';
      if (this.type === 'danger') return 'WARNING';
      return 'TIP';
    },
  },
};
</script>
