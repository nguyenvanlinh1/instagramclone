package com.nvl.ins_be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class InsBeApplication {

	public static void main(String[] args) {
		SpringApplication.run(InsBeApplication.class, args);
	}

}
