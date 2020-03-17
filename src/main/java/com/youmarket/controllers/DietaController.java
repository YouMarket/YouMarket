package com.youmarket.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.youmarket.domain.Dieta;
import com.youmarket.services.DietaService;

@RestController
@RequestMapping("dieta")
public class DietaController {



		@Autowired
		private DietaService dietaService;
		
		@RequestMapping("/list")
		public List<Dieta> listDietas(Model model){
			List<Dieta> dietas=dietaService.findAll();
			
			return dietas;
		}
		

}
