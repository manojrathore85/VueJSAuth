<template>
    <div class="card">
        <Form @submit="createUser" :validation-schema="createSchema" v-slot="{errors}"  > 

        <div class="card-header">
            <h5>Register</h5>
        </div>
        <div class="card-body">
            <div class="col-mb-3">
                <label for="firstname" class="form-label">First Name</label>
                <Field type="firstname" class="form-control" :class="{'is-invalid':errors.firstname}" name="firstname" id="firstname" placeholder="FirstName" value="asdfa"/> 
                <span class="invalid-feedback">{{ errors.firstname }}</span>       
            </div>
            <div class="col-mb-3">
                <label for="lastname" class="form-label">Last Name</label>
                <Field type="lastname" class="form-control" :class="{'is-invalid':errors.lastname}" name="lastname" id="lastname" placeholder="LastName" value="asdfasdfff"/> 
                <span class="invalid-feedback">{{ errors.lastname}}</span>            
            </div>

            <div class="col-mb-3">
                <label for="email" class="form-label">Email </label>
                <Field type="email" class="form-control" :class="{'is-invalid':errors.email}" name="email" id="email" placeholder="Email"/> 
                <span class="invalid-feedback">{{ errors.email }}</span>            
            </div>
            <div class="col-mb-3">
                <label for="password" class="form-label">Password</label>
                <Field type="password" class="form-control" :class="{'is-invalid':errors.password}" name="password" id="password" placeholder="Password" value="abc123456"/>  
                <span class="invalid-feedback">{{ errors.password }}</span>           
            </div>
            <div class="mb-3">
                <label for="c_password" class="form-label">Confirm Password</label>
                <Field type="password" class="form-control" :class="{'is-invalid':errors.c_password}" name="c_password" id="c_password" placeholder="Confirm Password" value="abc123456"/>  
                <span class="invalid-feedback">{{ errors.c_password }}</span>           
            </div>
            
            
        </div>
        <div class="card-footer">
            <!--<button type="submit" class="btn btn-primary" >Save</button> -->
            <button  class="btn btn-primary">Register</button>
            <!-- :disabled="isSubmitting">{{ isSubmitting ? 'Submitting...' : 'Submit' }} -->
        </div>
        </Form>
    </div>
</template>
<script setup>
    import {ref, onMounted, reactive} from 'vue';
    import { useRouter } from 'vue-router'; // Import router
    import { useStore } from 'vuex'; // Import Store
    import {Form, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { useToast } from 'vue-toastification';
    const toast = useToast();
    const router = useRouter();
    const store = useStore();
    const users = ref([]);
    const createSchema = yup.object({
        firstname:yup.string().required(),
        lastname:yup.string().required(),
        email:yup.string().required().email(),
        password:yup.string().required().min(8).max(16),
        c_password:yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match'),
        
    })
    
    onMounted(() => {
            toast.success('Register Your self');        
    })
    const createUser = async(values, {resetForm, setFieldError}) => {
        console.log(values);
        
        try {
            const response = await store.dispatch('register', values);             
            if(response.data.success){
                resetForm();
                console.log(response);
                toast.success(response.data.message);
                router.push({ name: 'Dashboard' });
            }else{
                toast.error(response.data.message);
            }
            
        
        } catch (error) {
            if(error.response && error.response.status == 422 ){
                const errors = error.response.data.errors; // Laravel validation errors
                Object.keys(errors).forEach(field => {
                    setFieldError(field, errors[field][0]); // Set the backend validation error
                }); 
            }else{
                console.log(error);
                toast.error('Something went wrong.');
            }

        }

        
    }

    

 
</script>