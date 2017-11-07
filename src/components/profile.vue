<template>
    <md-layout :md-column="true">
        <md-toolbar class="md-dense">
            <h2 class="md-title" style="flex: 1">Profile / Settings</h2>
        </md-toolbar>
        <form>
            <md-list>
                <md-list-item>
                    <md-avatar class="md-large">
                        <img src="https://placeimg.com/64/64/people/1" alt="People">
                    </md-avatar>
                </md-list-item>
                <md-list-item>
                    <md-input-container>
                        <label>Phone Number</label>
                        <md-input></md-input>
                    </md-input-container>
                </md-list-item>
                <md-list-item>
                    <md-input-container>
                        <label>Username</label>
                        <md-input></md-input>
                    </md-input-container>
                </md-list-item>
                <md-list-item>
                    <md-switch id="my-test0" name="my-test0" class="md-primary">Switch 1</md-switch>
                </md-list-item>
                <md-list-item>
                    <md-switch id="my-test1" name="my-test1" class="md-primary">Switch 2</md-switch>
                </md-list-item>
                <md-list-item>
                    <md-switch id="my-test2" name="my-test2" class="md-primary">Switch 3</md-switch>
                </md-list-item>
            </md-list>
        </form>
    </md-layout>
</template>
<script>
    export default {};
</script>
