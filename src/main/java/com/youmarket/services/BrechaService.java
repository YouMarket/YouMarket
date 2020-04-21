package com.youmarket.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youmarket.domain.Brecha;
import com.youmarket.repositories.BrechaRepository;

@Service
public class BrechaService {

	@Autowired
	private BrechaRepository brechaRepository;


	public void activaDesactivaBrecha() {
		Brecha brecha1 = this.brechaRepository.findAll().get(0);
		Boolean activada = brecha1.getActivada();
		if(activada) {
			brecha1.setActivada(false);
		} else {
			brecha1.setActivada(true);
		}
		this.brechaRepository.save(brecha1);
	}

	public Boolean devuelveBrecha() {
		return this.brechaRepository.findAll().get(0).getActivada();
	}

}