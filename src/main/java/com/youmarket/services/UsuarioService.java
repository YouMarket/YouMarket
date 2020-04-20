package com.youmarket.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.lang.Assert;

import com.youmarket.configuration.security.UserPrincipal;
import com.youmarket.domain.Usuario;
import com.youmarket.repositories.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repo;

	public List<Usuario> listaUsuarios(){

		return repo.findAll();
	}

	public Optional<Usuario> findUsuarioByLogin(String email, String password){
		return repo.findUsuarioByLogin(email, password);
	}

	public Optional<Usuario> findById(int id){
		return repo.findById(id);
	}

	public boolean checkUsuariAvailability(String email) {
		return !repo.findByEmail(email).isPresent();
	}
	
	public Usuario showProduct(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public Usuario save(Usuario p) {
		Assert.isTrue(this.validarDNI(p.getDni()), "El dni no es válido");
		return repo.save(p);

	}

	public void delete() {
		// TODO Auto-generated method stub

	}

	public Integer enviosRestantes(Usuario usuario1) {
		Integer envios = this.repo.getEnvios(usuario1.getId());
		
		return envios;
	}

	public boolean validarDNI(String dniAComprobar){
		char[] letraDni = {
            'T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D',  'X',  'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'
		};  
		String num= "";
        int ind = 0;  
        boolean valido = true;
        if (!Character.isLetter(dniAComprobar.charAt(8)) || dniAComprobar.length() != 9){   
             valido = false;  
        }
  
        if (dniAComprobar.length() != 9){   
            valido = false;
        }  
        for (int i=0; i<8; i++) {
             if(!Character.isDigit(dniAComprobar.charAt(i))){
                   valido = false;    
             }
             num += dniAComprobar.charAt(i);     
        }
        ind = Integer.parseInt(num);
        ind %= 23;
  
    	if ((Character.toUpperCase(dniAComprobar.charAt(8))) != letraDni[ind]){
             valido = false;
		   }
		if (valido != true){
			valido = dniAComprobar.contains("00000000X");
		}
       	return valido ;
   }
}
