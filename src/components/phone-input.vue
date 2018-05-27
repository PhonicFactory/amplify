<style lang="scss">
    @import "../styles/variables";

    $input-height: 48px;

    .phone-input {
        border-radius: $gutter-sm;
        border: solid 1px #ccc;
        min-height: $input-height;
        line-height: $input-height;

        &,
        .phone-input-select,
        .phone-input-prefix {
            flex: 0;
        }

        &.input-invalid {
            border-color: $red;
        }

        .phone-input-select {
            border-right: solid 1px #ccc;
        }

        .phone-input-input {
            flex: 1;
        }

        .md-input-container {
            padding: 0;
            margin: 0;

            &:after {
                display: none;
            }
        }
    }
</style>
<template>
    <md-layout class="phone-input" :class="{ 'input-invalid': invalid }">
        <div class="phone-input-select pl-sm pr-sm">
            <md-icon md-src="/images/flag-us.png" />
        </div>
        <div class="phone-input-prefix pl-sm pr-sm">+1</div>
        <div class="phone-input-input">
            <md-input-container :class="{ 'md-input-invalid': invalid }">
                <md-input
                    md-clearable
                    ref="input"
                    class="mt-sm"
                    v-model="value"
                    maxlength="10"
                    pattern="^\d{10}$"
                    placeholder="8888675309"
                    required
                />
            </md-input-container>
        </div>
    </md-layout>
</template>
<script>
    export default {
        data() {
            return {
                invalid: false,
                value: null,
            };
        },
        watch: {
            value(val) {
                this.invalid = !this.$refs.input.$el.checkValidity();
                this.$emit('changed', this.invalid ? false : val);
            }
        }
    };
</script>
