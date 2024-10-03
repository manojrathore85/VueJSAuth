<template>
    <div class="container d-flex vh-100">
        <div class="row justify-content-center align-self-center w-100">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                <div class="card">
                    <Form @submit="loginUser" :validation-schema="loginSchema" v-slot="{ errors }">

                        <div class="card-header">
                            <h5>{{ titleName }}</h5>
                        </div>
                        <div class="card-body">

                            <div class="col-mb-3">
                                <label for="email" class="form-label">Email </label>
                                <Field type="email" class="form-control" :class="{ 'is-invalid': errors.email }"
                                    name="email" id="email" placeholder="Email" />
                                <span class="invalid-feedback">{{ errors.email }}</span>
                            </div>
                            <div class="col-mb-3">
                                <label for="password" class="form-label">Password</label>
                                <Field type="password" class="form-control" :class="{ 'is-invalid': errors.password }"
                                    name="password" id="password" placeholder="Password" />
                                <span class="invalid-feedback">{{ errors.password }}</span>
                            </div>


                        </div>
                        <div class="card-footer">
                            <!--<button type="submit" class="btn btn-primary" >Save</button> -->
                            <button class="btn btn-primary" :disabled="isSubmitting">{{ isSubmitting ? 'Submitting...' :
                                'Submit' }}</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import axios from 'axios';
import {ref, onMounted, reactive} from 'vue';
import {Form, Field, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router'; // Import router


const titleName = "Login";
const toast = useToast();
const users = ref([]);
const router = useRouter(); // Use useRouter to get the router
const { setErrors } = useForm(); // Use useForm to get setErrors
let isSubmitting = false;
const loginUser = (values, { resetForm }) => {

    console.log(values);
    
        isSubmitting = true;
        axios.post('api/login', values).then((response) => {    
            console.log(response);
            if (response.success) {
                router.push({ name: 'Dashboard' });
                toast.success(response.message);
                resetForm();

            } else {
                console.log('fail');

                toast.error('getting error');
                //setErrors(error.response.data.errors);

            }
        });

}
const loginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(16),
})




</script>