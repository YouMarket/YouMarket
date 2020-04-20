package com.youmarket.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.youmarket.configuration.security.CustomUserDetailsService;
import com.youmarket.configuration.security.JwtAuthenticationEntryPoint;
import com.youmarket.configuration.security.JwtAuthenticationFilter;

/**
 * 
 * @author alvaroesteban
 * 
 *         EnableWebSecurity: Habilita la seguridad web en el proyecto
 *         EnableGlobalMethodSecurity: This is used to enable method level
 *         security based on annotations. securedEnabled: It enables the @
 *         Secured annotation using which you can protect your
 *         controller/service jsr250Enabled: It enables the @RolesAllowed
 *         annotation that can be used prePostEnabled: It enables more complex
 *         expression based access control syntax with @ PreAuthorize and @
 *         PostAuthorize annotations
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	CustomUserDetailsService customUserDetailsService;

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.cors()
			.and().csrf().disable()
			.exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
			.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
			.and().authorizeRequests()
				.antMatchers("/", "/favicon.ico", "/**/*.png", "/**/*.gif", "/**/*.svg", "/**/*.jpg", "/**/*.html",
						"/**/*.css", "/**/*.js")
				.permitAll()
				.antMatchers("/usuario/*").permitAll()
				.antMatchers("/usuario/signIn").permitAll()
				.antMatchers("/usuario/signUp").permitAll()
				.antMatchers("/direccion/dirs").permitAll()
				.antMatchers("/usuario/signIn").permitAll()
				.antMatchers("/usuario/signUp").permitAll()
				.antMatchers("/usuario/signUpAll").permitAll()
				.antMatchers("/suscripcion/all").permitAll()
				.antMatchers("/producto/*").permitAll()
				.antMatchers("/dieta/list").permitAll()
				.antMatchers("/show/dieta/*").permitAll()
				.antMatchers("/create/dieta").permitAll()
				.antMatchers("/pedido").authenticated()
				.anyRequest().permitAll();

		// Add our custom JWT security filter
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
	}

	/**
	 * AuthenticationManager instance is the main Spring Security interface for
	 * authenticating a user.
	 */
	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
