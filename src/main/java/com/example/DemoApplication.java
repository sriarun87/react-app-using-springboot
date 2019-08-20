package com.example;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}

@Controller
class HomeController {

	@Autowired
	public UserRepository userRepository;

	@GetMapping
	@RequestMapping("/")
	public ModelAndView home() {

		ModelAndView mav = new ModelAndView();
		Date date = new Date();
		mav.addObject("version", date.getTime());

		mav.setViewName("index");
		return mav;
	}

	@GetMapping
	@RequestMapping("/welcome")
	public String welcome() {
		return "welcome";
	}

	@GetMapping
	@RequestMapping("/v2/users")
	public @ResponseBody Iterable<User> getAllUsers() {
		return userRepository.findAll();
	}

	@PostMapping
	@RequestMapping("/v2/user")
	public @ResponseBody String addNewUser(@RequestBody User user) {
		userRepository.save(user);
		return "User Saved";
	};

	@GetMapping
	@RequestMapping("/v2/service")
	@ResponseBody
	public String service() {
		return "{\"mockData\":{\"mockItems\":[{\"itemId\":\"100007602\",\"lineItemType\":\"Merchandize\",\"sortLineItemType\":\"Merchandize\",\"lineItemId\":\"826ef190-bfdc-11e9-98ff-e567c710471c\",\"description\":\"32 oz. Professional Spray Bottle\",\"quantity\":\"1\",\"unitPrice\":\"3.98\",\"totalItemPrice\":\"3.98\",\"image\":\"https://images.homedepot-static.com/productImages/960f2516-7889-4ad0-b9d6-450bc2aebf42/svn/zep-spray-bottles-hdpro36-64_400.jpg\",\"modelNumber\":\"HDPRO36\",\"partNumber\":\"100007602\",\"brandName\":\"ZEP\",\"productLabel\":\"32 oz. Professional Spray Bottle\",\"canonicalUrl\":\"/p/ZEP-32-oz-Professional-Spray-Bottle-HDPRO36/100007602\",\"shipType\":\"82\",\"fulfillmentModel\":[{\"fulfillmentMethod\":\"ShipToHome\",\"estStartDeliveryDate\":\"2019-08-20\",\"estEndDeliveryDate\":\"2019-08-20\",\"selected\":true,\"freeShipping\":true,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"1047\"},{\"fulfillmentMethod\":\"BOPIS\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"pickUpStore\":\"0159\",\"pickUpStoreAddress\":\"Midtown #0159\",\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"38\",\"city\":\"Atlanta\",\"state\":\"GA\",\"zipCode\":\"30308\"},{\"fulfillmentMethod\":\"DeliverFromStore\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\"}],\"freeAssemblyEligible\":false},{\"itemId\":\"203497480\",\"lineItemType\":\"Merchandize\",\"sortLineItemType\":\"Merchandize\",\"lineItemId\":\"809bb830-bfdc-11e9-a4d9-35e3b1d85203\",\"description\":\"6 ft. 3-Prong 30 Amp Dryer Cord\",\"quantity\":\"1\",\"unitPrice\":\"19.97\",\"totalItemPrice\":\"19.97\",\"image\":\"https://images.homedepot-static.com/productImages/1b1cab47-776a-4c51-9938-bd76f88de7cc/svn/ge-dryer-parts-wx09x10004ds-64_400.jpg\",\"modelNumber\":\"WX09X10004DS\",\"partNumber\":\"203497480\",\"brandName\":\"GE\",\"productLabel\":\"6 ft. 3-Prong 30 Amp Dryer Cord\",\"canonicalUrl\":\"/p/GE-6-ft-3-Prong-30-Amp-Dryer-Cord-WX09X10004DS/203497480\",\"shipType\":\"73\",\"fulfillmentModel\":[{\"fulfillmentMethod\":\"ShipToHome\",\"estStartDeliveryDate\":\"2019-08-19\",\"estEndDeliveryDate\":\"2019-08-19\",\"selected\":true,\"freeShipping\":true,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"54\"},{\"fulfillmentMethod\":\"BOPIS\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"pickUpStore\":\"0159\",\"pickUpStoreAddress\":\"Midtown #0159\",\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"13\",\"city\":\"Atlanta\",\"state\":\"GA\",\"zipCode\":\"30308\"},{\"fulfillmentMethod\":\"DeliverFromStore\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\"}],\"freeAssemblyEligible\":false},{\"itemId\":\"100050673\",\"lineItemType\":\"Merchandize\",\"sortLineItemType\":\"Merchandize\",\"lineItemId\":\"7df32d70-bfdc-11e9-b612-053f79826755\",\"description\":\"4 in. x 8 ft. Dryer Duct\",\"quantity\":\"1\",\"unitPrice\":\"12.98\",\"totalItemPrice\":\"12.98\",\"image\":\"https://images.homedepot-static.com/productImages/7ffedfd2-52fc-4bfb-bef2-46a081282779/svn/ge-dryer-parts-pm8x73ds-64_400.jpg\",\"modelNumber\":\"PM8X73DS\",\"partNumber\":\"100050673\",\"brandName\":\"GE\",\"productLabel\":\"4 in. x 8 ft. Dryer Duct\",\"canonicalUrl\":\"/p/GE-4-in-x-8-ft-Dryer-Duct-PM8X73DS/100050673\",\"shipType\":\"82\",\"fulfillmentModel\":[{\"fulfillmentMethod\":\"ShipToHome\",\"estStartDeliveryDate\":\"2019-08-20\",\"estEndDeliveryDate\":\"2019-08-20\",\"selected\":true,\"freeShipping\":true,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"29\"},{\"fulfillmentMethod\":\"BOPIS\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"pickUpStore\":\"0159\",\"pickUpStoreAddress\":\"Midtown #0159\",\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"13\",\"city\":\"Atlanta\",\"state\":\"GA\",\"zipCode\":\"30308\"},{\"fulfillmentMethod\":\"DeliverFromStore\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\"}],\"freeAssemblyEligible\":false},{\"itemId\":\"205473453\",\"lineItemType\":\"Merchandize\",\"sortLineItemType\":\"Merchandize\",\"lineItemId\":\"48bcb750-bfd4-11e9-a0a8-350572a6fee5\",\"description\":\"4 ft. Universal Stainless Steel Washer Hoses\",\"quantity\":\"1\",\"unitPrice\":\"22.98\",\"totalItemPrice\":\"22.98\",\"image\":\"https://images.homedepot-static.com/productImages/c7180e02-15c0-4261-a9e6-7cb3541d351e/svn/ge-washing-machine-parts-pm14x10008ds-64_400.jpg\",\"modelNumber\":\"PM14X10008DS\",\"partNumber\":\"205473453\",\"brandName\":\"GE\",\"productLabel\":\"4 ft. Universal Stainless Steel Washer Hoses\",\"canonicalUrl\":\"/p/GE-4-ft-Universal-Stainless-Steel-Washer-Hoses-PM14X10008DS/205473453\",\"shipType\":\"73\",\"fulfillmentModel\":[{\"fulfillmentMethod\":\"ShipToHome\",\"estStartDeliveryDate\":\"2019-08-19\",\"estEndDeliveryDate\":\"2019-08-19\",\"selected\":true,\"freeShipping\":true,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"427\"},{\"fulfillmentMethod\":\"BOPIS\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"pickUpStore\":\"0159\",\"pickUpStoreAddress\":\"Midtown #0159\",\"inventoryStatus\":\"AVL\",\"availableQuantity\":\"10\",\"city\":\"Atlanta\",\"state\":\"GA\",\"zipCode\":\"30308\"},{\"fulfillmentMethod\":\"DeliverFromStore\",\"selected\":false,\"freeShipping\":false,\"freeShippingIfThresholdMet\":false,\"inventoryStatus\":\"AVL\"}],\"freeAssemblyEligible\":false}]}}";
	}
}
